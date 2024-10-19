const beginDateIsEarlierEndDates = (begin_date_time, end_date_time) => {
  if (new Date(begin_date_time) < new Date(end_date_time)) return true;

  return false;
};

const formattedLocationsData = (locationsArray) =>
  locationsArray.reduce((acc, row) => {
    // Verifica se já existe a localização no accumulator
    const existingLocation = acc.find(
      (item) => item.location_id === row.location_id,
    );

    // Se não existir, cria uma nova localização
    if (!existingLocation) {
      const newLocation = {
        location_id: row.location_id,
        location: row.location,
        events:
          row.event_id != null
            ? [
                {
                  event_id: row.event_id,
                  name: row.name,
                  begin_date_time: row.begin_date_time,
                  end_date_time: row.end_date_time,
                },
              ]
            : [],
      };
      acc.push(newLocation);
    } else {
      // Se existir, adiciona o evento à localização existente
      existingLocation.events.push({
        event_id: row.event_id,
        name: row.name,
        begin_date_time: row.begin_date_time,
        end_date_time: row.end_date_time,
      });
    }

    return acc;
  }, []);

const formattedEventsData = (eventsArray) =>
  eventsArray.reduce((acc, row) => {
    const existingEvent = acc.find((item) => item.event_id === row.event_id);

    if (!existingEvent) {
      const newEvent = {
        event_id: row.event_id,
        name: row.name,
        begin_date_time: row.begin_date_time,
        end_date_time: row.end_date_time,
        location: row.location,
        lectures:
          row.lecture_id != null
            ? [
                {
                  lecture_id: row.lecture_id,
                  theme: row.theme,
                  begin_date_time: row.lecture_begin_date_time,
                  panelist_id: row.panelist_id,
                },
              ]
            : [],
      };
      acc.push(newEvent);
    } else {
      existingEvent.lectures.push({
        lecture_id: row.lecture_id,
        theme: row.theme,
        begin_date_time: row.lecture_begin_date_time,
        panelist_id: row.panelist_id,
      });
    }

    return acc;
  }, []);

module.exports = {
  beginDateIsEarlierEndDates,
  formattedLocationsData,
  formattedEventsData,
};
