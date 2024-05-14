const { NotFoundError, ConflictError } = require("../common/helpers/api-error");
const {
  OKResponse,
  CreatedResponse,
} = require("../common/helpers/api-success");
const locationRepository = require("./locationRepository");

class LocationController {
  async showAll(req, res) {
    const [allLocations] = await locationRepository.findAll();

    return new OKResponse("All locations found!", allLocations).send(res);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    return new OKResponse("Location found!", locationById).send(res);
  }

  async addNew(req, res) {
    const locationBody = req.body;

    const [locationExists] = await locationRepository.findByName(locationBody);

    if (locationExists.length != 0)
      throw new ConflictError("Location already exists");

    const [newLocation] = await locationRepository.insert(locationBody);

    return new CreatedResponse("Location created!", newLocation).send(res);
  }

  async update(req, res) {
    const locationBody = req.body;
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    const [updateLocation] = await locationRepository.update(id, locationBody);

    return new OKResponse("Location updated!", updateLocation).send(res);
  }

  async delete(req, res) {
    const { id } = req.params;

    const [locationById] = await locationRepository.findById(id);

    if (locationById.length == 0) throw new NotFoundError("Location not found");

    const [deleteLocation] = await locationRepository.remove(id);

    return new OKResponse("Location deleted!", deleteLocation).send(res);
  }
}

module.exports = new LocationController();
