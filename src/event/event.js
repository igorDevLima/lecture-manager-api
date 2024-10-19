const { Router } = require('express');
const eventController = require('./eventController');
const validateParamsID = require('../common/middlewares/paramsID');
const validateEvent = require('./eventMiddleware');

const router = Router();

router.get('/', (req, res) => eventController.showAll(req, res));

router.get('/:id', validateParamsID, (req, res) =>
  eventController.showById(req, res),
);

router.post('/', validateEvent, (req, res) => eventController.create(req, res));

router.put('/:id', [validateParamsID, validateEvent], (req, res) =>
  eventController.update(req, res),
);

router.delete('/:id', validateParamsID, (req, res) =>
  eventController.delete(req, res),
);

module.exports = router;
