const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makePalettesArray } = require('./palettes.fixtures');

let db;

before('make knex instance', () => {
  db = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
  app.set('db', db);
});

before('clean the table', () => db('palettes').truncate());
afterEach('cleanup', () => db('palettes').truncate());

after('disconnect from db', () => db.destroy());

describe(`GET /api/palettes`, () => {
  context(`Given no palettes`, () => {
    it(`responds with 200 and an empty list`, () => {
      return supertest(app).get('/api/palettes').expect(200, []);
    });
  });

  context('Given there are palettes in the database', () => {
    const { testPalettes, testPalettesInDatabase } = makePalettesArray();

    beforeEach('insert palettes', () => {
      return db
        .into('users')
        .insert(makeUsersArray())
        .then(() => {
          return db.into('palettes').insert(testPalettes);
        });
    });

    it('responds with 200 and all of the palettes', () => {
      return supertest(app)
        .get('/api/palettes')
        .expect(200, testPalettesInDatabase);
    });
  });
});

describe(`GET /api/palettes/:palette_id`, () => {
  context(`Given no palettes`, () => {
    it(`responds with 404`, () => {
      const paletteId = 123456;
      return supertest(app)
        .get(`/api/palettes/${paletteId}`)
        .expect(404, { error: { message: `Palette doesn't exist` } });
    });
  });

  context('Given there are palettes in the database', () => {
    const { testPalettes } = makePalettesArray();

    beforeEach('insert palettes', () => {
      return db
        .into('users')
        .insert(makeUsersArray())
        .then(() => {
          return db.into('palettes').insert(testPalettes);
        });
    });

    it('responds with 200 and the specified palette', () => {
      const paletteId = 2;
      const expectedPalette = {
        id: 2,
        palette_name: 'Nice Colors',
        hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,,,,,,',
        user_id: 1,
      };
      return supertest(app)
        .get(`/api/palettes/${paletteId}`)
        .expect(200, expectedPalette);
    });
  });
});

describe(`POST /api/palettes`, () => {
  const { testPalettes } = makePalettesArray();

  beforeEach('insert palettes', () => {
    return db
      .into('users')
      .insert(makeUsersArray())
      .then(() => {
        return db.into('palettes').insert(testPalettes);
      });
  });

  it(`creates an palette, responding with 201 and the new palette`, () => {
    const newPalette = {
      palette_name: 'New Palette',
      hex: '#ff0000,#00ff00,#0000ff,#ff00ff,,,,,,',
      user_id: 1,
    };

    return supertest(app)
      .post('/api/palettes')
      .send(newPalette)
      .expect(201)
      .expect((res) => {
        expect(res.body.palette_name).to.eql(newPalette.palette_name);
        expect(res.body.hex).to.eql(newPalette.hex);
        expect(res.body.user_id).to.eql(newPalette.user_id);
        expect(res.body).to.have.property('id');
        expect(res.headers.location).to.eql(`/api/palettes/${res.body.id}`);
      })
      .then((postRes) =>
        supertest(app)
          .get(`/api/palettes/${postRes.body.id}`)
          .expect(postRes.body)
      );
  });

  const requiredFields = ['palette_name', 'hex', 'user_id'];

  requiredFields.forEach((field) => {
    const newPalette = {
      palette_name: 'New Palette',
      hex: '#ff0000,#00ff00,#0000ff,#ff00ff,,,,,,',
      user_id: 1,
    };

    it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newPalette[field];

      return supertest(app)
        .post('/api/palettes')
        .send(newPalette)
        .expect(400, {
          error: { message: `Missing '${field}' in request body` },
        });
    });
  });
});

describe(`PATCH /api/palettes/:palette_id`, () => {
  context(`Given no palettes`, () => {
    it(`responds with 404`, () => {
      const paletteId = 123456;
      return supertest(app)
        .patch(`/api/palettes/${paletteId}`)
        .expect(404, { error: { message: `Palette doesn't exist` } });
    });
  });

  context('Given there are palettes in the database', () => {
    const { testPalettes } = makePalettesArray();

    beforeEach('insert palettes', () => {
      return db
        .into('users')
        .insert(makeUsersArray())
        .then(() => {
          return db.into('palettes').insert(testPalettes);
        });
    });

    it('responds with 204 and updates the palette', () => {
      const idToUpdate = 2;
      const updatePalette = {
        palette_name: 'New Nice Colors',
        hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,#0fff0f,#ff0f0f,,,,',
        user_id: 1,
      };
      const expectedPalette = {
        id: 2,
        palette_name: 'New Nice Colors',
        hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,#0fff0f,#ff0f0f,,,,',
        user_id: 1,
      };

      return supertest(app)
        .patch(`/api/palettes/${idToUpdate}`)
        .send(updatePalette)
        .expect(204)
        .then((res) =>
          supertest(app)
            .get(`/api/palettes/${idToUpdate}`)
            .expect(expectedPalette)
        );
    });

    it(`responds with 400 when no required fields supplied`, () => {
      const idToUpdate = 2;
      return supertest(app)
        .patch(`/api/palettes/${idToUpdate}`)
        .send({ irrelevantField: 'foo' })
        .expect(400, {
          error: {
            message: `Request body must contain either 'palette_name', 'hex', or 'user_id'`,
          },
        });
    });

    it(`responds with 204 when updating only a subset of fields`, () => {
      const idToUpdate = 2;
      const updatePalette = {
        palette_name: 'New Nice Colors',
      };
      const expectedPalette = {
        id: 2,
        palette_name: 'New Nice Colors',
        hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,,,,,,',
        user_id: 1,
      };

      return supertest(app)
        .patch(`/api/palettes/${idToUpdate}`)
        .send({
          ...updatePalette,
          fieldToIgnore: 'should not be in GET response',
        })
        .expect(204)
        .then((res) =>
          supertest(app)
            .get(`/api/palettes/${idToUpdate}`)
            .expect(expectedPalette)
        );
    });
  });
});

describe(`DELETE /api/palettes/:palette_id`, () => {
  context(`Given no palettes`, () => {
    it(`responds with 404`, () => {
      const paletteId = 123456;
      return supertest(app)
        .delete(`/api/palettes/${paletteId}`)
        .expect(404, { error: { message: `Palette doesn't exist` } });
    });
  });

  context('Given there are palettes in the database', () => {
    const { testPalettes, testPalettesInDatabase } = makePalettesArray();

    beforeEach('insert palettes', () => {
      return db
        .into('users')
        .insert(makeUsersArray())
        .then(() => {
          return db.into('palettes').insert(testPalettes);
        });
    });

    it('responds with 204 and removes the palette', () => {
      const idToRemove = 2;
      const expectedPalettes = testPalettesInDatabase.filter(
        (palette) => palette.id !== idToRemove
      );

      return supertest(app)
        .delete(`/api/palettes/${idToRemove}`)
        .expect(204)
        .then((res) =>
          supertest(app).get(`/api/palettes`).expect(expectedPalettes)
        );
    });
  });
});
