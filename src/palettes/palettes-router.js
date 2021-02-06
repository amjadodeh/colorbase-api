const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');

const PalettesService = require('./palettes-service');

const palettesRouter = express.Router();
const jsonParser = express.json();

const serializePalette = (palette) => ({
  id: Number(palette.id),
  palette_name: palette.palette_name,
  hex: palette.hex,
  user_id: Number(palette.user_id),
});

palettesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    PalettesService.getAllPalettes(knexInstance)
      .then((palettes) => {
        res.json(palettes.map(serializePalette));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { palette_name, hex, user_id } = req.body;
    const newPalette = { palette_name, hex, user_id };

    for (const [key, value] of Object.entries(newPalette)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }

    PalettesService.insertPalette(req.app.get('db'), newPalette)
      .then((palette) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${palette.id}`))
          .json(serializePalette(palette));
      })
      .catch(next);
  });

palettesRouter
  .route('/:paletteId')
  .all((req, res, next) => {
    PalettesService.getById(req.app.get('db'), req.params.paletteId)
      .then((palette) => {
        if (!palette) {
          return res.status(404).json({
            error: { message: `Palette doesn't exist` },
          });
        }
        res.palette = palette;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializePalette(res.palette));
  })
  .delete((req, res, next) => {
    PalettesService.deletePalette(req.app.get('db'), req.params.paletteId)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    // not yet implemented on client-side
    const { palette_name, hex, user_id } = req.body;
    const paletteToUpdate = { palette_name, hex, user_id };

    const numberOfValues = Object.values(paletteToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'palette_name', 'hex', or 'user_id'`,
        },
      });

    PalettesService.updatePalette(
      req.app.get('db'),
      req.params.paletteId,
      paletteToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = palettesRouter;
