const { NotFoundError, ConflictError } = require("../common/helpers/api-error");
const locationRepository = require("./locationRepository");

class LocationController {
  async showAll(req, res) {
    const [allLocations] = await locationRepository.findAll();

    return res.status(200).json(allLocations);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    return res.status(200).json(locationById);
  }

  async addNew(req, res) {
    const locationBody = req.body;

    const [locationExists] = await locationRepository.findByName(locationBody);

    if (locationExists.length != 0)
      throw new ConflictError("Location already exists");

    const [addNewLocation] = await locationRepository.insert(locationBody);

    return res.status(200).json({
      message: "Location added!",
      data: addNewLocation,
    });
  }

  async update(req, res) {
    const locationBody = req.body;
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    const [updateNewLocation] = await locationRepository.update(
      id,
      locationBody
    );

    return res.status(200).json({
      message: "Location updated!",
      data: updateNewLocation,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    const [deleteNewLocation] = await locationRepository.remove(id);

    return res.status(200).json({
      message: "Location deleted!",
      data: deleteNewLocation,
    });
  }
}

module.exports = new LocationController();
