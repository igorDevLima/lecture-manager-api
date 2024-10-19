const connection = require('../common/db/connection');

class LocationRepository {
  insert = (location) =>
    connection.execute(`INSERT INTO locations (name) VALUES (?);`, [
      location.name,
    ]);

  insertIfNameDontExist = (location) =>
    connection.execute(
      `
      INSERT INTO locations (name)
      SELECT * FROM (SELECT ?) AS tmp
      WHERE NOT EXISTS (
          SELECT name FROM locations WHERE name = ?
      ) LIMIT 1;
      `,
      [location.name, location.name],
    );

  findAll = () =>
    connection.execute(`
    SELECT
      L.location_id,
      L.name as location,
          E.event_id,
          E.name,
          E.begin_date_time,
          E.end_date_time
    FROM
      events E
    RIGHT JOIN
      locations L
    ON E.location_id = L.location_id; 
  `);

  findById = (id) =>
    connection.execute(
      `
    SELECT
      L.location_id,
      L.name as location,
      E.event_id,
      E.name,
      E.begin_date_time,
      E.end_date_time
    FROM
      events E
    RIGHT JOIN
      locations L
    ON E.location_id = L.location_id WHERE L.location_id = ?`,
      [id],
    );

  findByName = (location) =>
    connection.execute(`SELECT * FROM locations WHERE name = ?`, [
      location.name,
    ]);

  update = (id, location) =>
    connection.execute(`UPDATE locations SET name = ? WHERE location_id = ?`, [
      location.name,
      id,
    ]);

  remove = (id) =>
    connection.execute(`DELETE FROM locations WHERE location_id = ?`, [id]);
}

module.exports = new LocationRepository();
