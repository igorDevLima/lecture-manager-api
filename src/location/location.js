const { Router } = require("express");
const locationController = require("./locationController");
const validateParamsID = require("../common/middlewares/paramsID");
const validateLocation = require("./locationMiddleware");

const router = Router();

router.get("/", (req, res) => locationController.showAll(req, res));

router.get("/:id", validateParamsID, (req, res) =>
  locationController.showById(req, res)
);

router.post("/", validateLocation, (req, res) =>
  locationController.addNew(req, res)
);


module.exports = router;
