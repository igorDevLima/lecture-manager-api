const { Router } = require("express");
const locationController = require("./locationController");

const router = Router();

router.get("/", (req, res) => locationController.showAll(req, res));

router.get("/:id", (req, res) => locationController.showById(req, res));

router.post("/", (req, res) => locationController.addNew(req, res));

module.exports = router;
