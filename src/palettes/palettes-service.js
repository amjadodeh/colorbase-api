const PalettesService = {
  getAllPalettes(knex) {
    return knex.select('*').from('palettes');
  },

  insertPalette(knex, newPalette) {
    return knex
      .insert(newPalette)
      .into('palettes')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from('palettes').select('*').where('id', id).first();
  },

  deletePalette(knex, id) {
    return knex('palettes').where({ id }).delete();
  },

  updatePalette(knex, id, newPaletteFields) {
    return knex('palettes').where({ id }).update(newPaletteFields);
  },
};

module.exports = PalettesService;
