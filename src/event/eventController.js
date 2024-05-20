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
const { formattedEventsData } = require("../common/helpers/functions");

const addLocationIfNotExistAndReturnID = async (location_name) => {
  let eventLocation = {};

  [eventLocation] = await locationRepository.insertIfNameDontExist({
    name: location_name,
  });

  if (eventLocation.insertId === 0) {
    const [adedLocation] = await locationRepository.findByName({
      name: location_name,
    });

    eventLocation.id = adedLocation[0].location_id;
  } else {
    eventLocation.id = eventLocation.insertId;
  }

  return eventLocation.id;
};

const checkLocationAvailability = async (
  location_id,
  body,
  ignoreEqualEventId = false,
  event_id = null
) => {
  if (ignoreEqualEventId && event_id === null)
    throw new Error("event_id is required");

  const [reservedEvents] = ignoreEqualEventId
    ? await eventRepository.findReservedLocationIgnoreEqualEventId(
        location_id,
        event_id,
        body
      )
    : await eventRepository.findReservedLocation(location_id, body);

  if (reservedEvents.length != 0)
    throw new ConflictError(
      "Sorry, the location is already reserved for this date."
    );
};

class eventController {
  async showAll(req, res) {
    const [allEvents] = await eventRepository.findAll();

    return new OKResponse(
      "All events found!",
      formattedEventsData(allEvents)
    ).send(res);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [eventById] = await eventRepository.findById(id);

    if (eventById.length == 0) throw new NotFoundError("event not found");

    return new OKResponse("Event found!", formattedEventsData(eventById)).send(
      res
    );
  }

  async create(req, res) {
    const eventBody = req.body;

    const location_id = eventBody.location
      ? await addLocationIfNotExistAndReturnID(eventBody.location)
      : null;

    await checkLocationAvailability(location_id, eventBody);

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

    await checkLocationAvailability(location_id, eventBody, true, id);

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
