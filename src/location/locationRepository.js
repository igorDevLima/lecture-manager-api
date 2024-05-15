const connection = require("../common/db/connection");

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
      [location.name, location.name]
    );

  findAll = () =>
    connection.execute(`
  SELECT * FROM locations
  `);

  findById = (id) =>
    connection.execute(`SELECT * FROM locations WHERE location_id = ?`, [id]);

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
