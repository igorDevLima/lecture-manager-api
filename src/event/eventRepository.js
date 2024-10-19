const connection = require('../common/db/connection');

class eventRepository {
  insert = (event) =>
    connection.execute(
      `INSERT INTO events (name, begin_date_time, end_date_time, location_id) VALUES (?, ?, ?, ?);`,
      [
        event.name,
        event.begin_date_time,
        event.end_date_time,
        event.location_id || null,
      ],
    );

  findAll = () =>
    connection.execute(
      `
    SELECT
        E.event_id,
        E.name,
        E.begin_date_time,
        E.end_date_time,
        L.name as location,
        LE.lecture_id,
        LE.theme,
        LE.begin_date_time as lecture_begin_date_time,
        LE.panelist_id
    FROM
        events E
    LEFT JOIN
        locations L
    ON E.location_id = L.location_id
    LEFT JOIN
        lectures LE
    ON E.event_id = LE.event_id;
  `,
    );

  findById = (id) =>
    connection.execute(
      `
      SELECT
	      E.event_id,
        E.name,
        E.begin_date_time,
        E.end_date_time,
        L.name as location,
        L.name as location,
        LE.lecture_id,
        LE.theme,
        LE.begin_date_time as lecture_begin_date_time,
        LE.panelist_id
      FROM
        events E
      LEFT JOIN
        locations L
        ON E.location_id = L.location_id
        LEFT JOIN
            lectures LE
        ON E.event_id = LE.event_id
      WHERE E.event_id = ?;
  `,
      [id],
    );

  findReservedLocation = (location_id, event) =>
    connection.execute(
      `
      SELECT *
      FROM events
      WHERE location_id = ?
      AND DATE(begin_date_time) <= DATE(?)
      AND DATE(?) <= DATE(end_date_time)
    `,
      [location_id, event.end_date_time, event.begin_date_time],
    );

  findReservedLocationIgnoreEqualEventId = (location_id, event_id, event) =>
    connection.execute(
      `
        SELECT *
        FROM events
        WHERE location_id = ?
        AND event_id != ?
        AND DATE(begin_date_time) <= DATE(?)
        AND DATE(?) <= DATE(end_date_time)
      `,
      [location_id, event_id, event.end_date_time, event.begin_date_time],
    );

  update = (id, event) =>
    connection.execute(
      `UPDATE events SET name = ? , begin_date_time = ? , end_date_time = ?, location_id = ?  WHERE event_id = ?`,
      [
        event.name,
        event.begin_date_time,
        event.end_date_time,
        event.location_id || null,
        id,
      ],
    );

  remove = (id) =>
    connection.execute(`DELETE FROM events WHERE event_id = ?`, [id]);
}

module.exports = new eventRepository();
