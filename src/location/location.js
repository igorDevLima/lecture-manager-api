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
  locationController.create(req, res)
);

router.put("/:id", [validateParamsID, validateLocation], (req, res) =>
  locationController.update(req, res)
);

router.delete("/:id", validateParamsID, (req, res) =>
  locationController.delete(req, res)
);

module.exports = router;
