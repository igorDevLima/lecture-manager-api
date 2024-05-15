const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../common/helpers/api-error");
const {
  OKResponse,
  CreatedResponse,
} = require("../common/helpers/api-success");
const eventRepository = require("./eventRepository");
const locationRepository = require("../location/locationRepository");

const addLocationIfNotExistAndReturnID = async (location) => {
  let eventLocation = {};

  [eventLocation] = await locationRepository.insertIfNameDontExist({
    name: location,
  });

  if (eventLocation.insertId === 0) {
    const [adedLocation] = await locationRepository.findByName({
      name: location,
    });

    eventLocation.id = adedLocation[0].location_id;
  } else {
    eventLocation.id = eventLocation.insertId;
  }

  return eventLocation.id;
};

class eventController {
  async showAll(req, res) {
    const [allEvents] = await eventRepository.findAll();

    return new OKResponse("All events found!", allEvents).send(res);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [eventById] = await eventRepository.findById(id);

    if (eventById.length == 0) throw new NotFoundError("event not found");

    return new OKResponse("Event found!", eventById).send(res);
  }

  async create(req, res) {
    const eventBody = req.body;

    const location_id = eventBody.location
      ? await addLocationIfNotExistAndReturnID(eventBody.location)
      : null;

    if (eventBody.begin_date_time && eventBody.end_date_time) {
      const [reservedEvents] = await eventRepository.findReservedLocation(
        location_id,
        eventBody
      );

      if (reservedEvents.length != 0)
        throw new BadRequestError(
          "Sorry, the location is already reserved for this date."
        );
    }

    const [newEvent] = await eventRepository.insert({
      name: eventBody.name,
      begin_date_time: eventBody.begin_date_time,
      end_date_time: eventBody.end_date_time,
      location_id: location_id,
    });

    return new CreatedResponse("Event added!", newEvent).send(res);
  }

  async update(req, res) {
    const eventBody = req.body;
    const { id } = req.params;

    const [eventById] = await eventRepository.findById(id);

    if (eventById.length == 0) throw new NotFoundError("Event not found");

    const location_id = eventBody.location
      ? await addLocationIfNotExistAndReturnID(eventBody.location)
      : null;

    if (eventBody.begin_date_time && eventBody.end_date_time) {
      const [reservedEvents] =
        await eventRepository.findReservedLocationIgnoreEqualEventId(
          location_id,
          id,
          eventBody
        );

      if (reservedEvents.length != 0)
        throw new BadRequestError(
          "Sorry, the location is already reserved for this date."
        );
    }

    const [updateEvent] = await eventRepository.update(id, {
      name: eventBody.name,
      begin_date_time: eventBody.begin_date_time,
      end_date_time: eventBody.end_date_time,
      location_id: location_id,
    });

    return new OKResponse("Event updated!", updateEvent).send(res);
  }

  async delete(req, res) {
    const { id } = req.params;

    const [eventById] = await eventRepository.findById(id);

    if (eventById.length == 0) throw new NotFoundError("Event not found");

    const [deleteEvent] = await eventRepository.remove(id);

    return new OKResponse("Event deleted!", deleteEvent).send(res);
  }
}

module.exports = new eventController();
