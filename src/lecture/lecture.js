const { Router } = require('express');
const lectureController = require('./lectureController');
const validateParamsID = require('../common/middlewares/paramsID');
const validateLecture = require('./lectureMiddleware');

const router = Router();

router.get('/', (req, res) => lectureController.showAll(req, res));

router.get('/:id', validateParamsID, (req, res) =>
  lectureController.showById(req, res),
);

router.post('/', validateLecture, (req, res) =>
  lectureController.create(req, res),
);

router.put('/:id', [validateParamsID, validateLecture], (req, res) =>
  lectureController.update(req, res),
);

router.delete('/:id', validateParamsID, (req, res) =>
  lectureController.delete(req, res),
);

module.exports = router;
