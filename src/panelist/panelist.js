const { Router } = require('express');
const panelistController = require('./panelistController');
const validateParamsID = require('../common/middlewares/paramsID');
const validatePanelist = require('./panelistMiddleware');

const router = Router();

router.get('/', (req, res) => panelistController.showAll(req, res));

router.get('/:id', validateParamsID, (req, res) =>
  panelistController.showById(req, res),
);

router.post('/', validatePanelist, (req, res) =>
  panelistController.create(req, res),
);

router.put('/:id', [validateParamsID, validatePanelist], (req, res) =>
  panelistController.update(req, res),
);

router.delete('/:id', validateParamsID, (req, res) =>
  panelistController.delete(req, res),
);

module.exports = router;
