# ColorStop Client

Create the perfect color palette for your project or get inspired by popular color palettes created by other users!

This is the backend for ColorStop. The live app can be found at [https://colorstop-client.vercel.app](https://colorstop-client.vercel.app)

The front end client can be found at [https://github.com/amjadodeh/colorstop-client](https://github.com/amjadodeh/colorstop-client).

## Introduction

ColorStop is the essential tool for creating and exploring color palettes. Create the perfect color palette, even if you are not skilled in design. Press 'Randomize!' on the Palette Maker to randomly generate color palettes until you find the perfect colors for you! ColorStop has a huge collection of color palettes that are well organized and ready to be used!

## Documentation

### Endpoints

- `/users`
  - GET all users, returns an id, username, and profile_picture for the each
  - POST new user, request must contain username and password
- `/users/:userId`
  - All requests contain a user id in place of ':userId'
  - GET a user, returns users id, username, and profile_picture
  - DELETE a user
  - PATCH a user, request must contain either username, profile_picture, or password
- `/signingIn/:userId`
  - POST handles user verification for signing in
- `/palettes`
  - GET all palettes, returns an id, palette_name, hex, and user_id for the each
  - POST new palette, request must contain palette_name, hex, and user_id
- `/palettes/:paletteId`
  - All requests contain a palette id in place of ':paletteId'
  - GET a palette, returns palettes id, palette_name, hex, and user_id
  - DELETE a palette
  - PATCH a palette, request must contain either palette_name, hex, or user_id

## Technology

#### Back End

- Node and Express
  - RESTful Api
- Testing
  - Supertest (integration)
  - Mocha and Chai (unit)
- Database
  - Postgres
  - Knex.js - SQL query builder

#### Production

Deployed via Heroku

## Set up

Major dependencies for this repo include Postgres and Node.

To get setup locally, do the following:

1. Clone this repository to your machine, `cd` into the directory and run `npm install`

2. Create the dev and test databases using the sql scripts in `/tablesScripts`

3. Create a `.env` file in the project root

Inside these files you'll need the following:

```
NODE_ENV=development
PORT=8000
DATABASE_URL="postgresql://dunder_mifflin@localhost/colorstop"
TEST_DATABASE_URL="postgresql://dunder_mifflin@localhost/colorstop-test"
CLIENT_ORIGIN=<optionally-your-site-here>
```

4. Run the tests - `npm t`
5. Start the app - `npm run dev`
