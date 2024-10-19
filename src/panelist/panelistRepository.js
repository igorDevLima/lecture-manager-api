const connection = require('../common/db/connection');

class PanelistRepository {
  insert = (panelist) =>
    connection.execute(
      `INSERT INTO panelists (first_name, last_name, academic_degree) VALUES (?, ?, ?);`,
      [
        panelist.first_name,
        panelist.last_name,
        panelist.academic_degree || null,
      ],
    );

  findAll = () =>
    connection.execute(`
    SELECT * FROM panelists; 
  `);

  findById = (id) =>
    connection.execute(
      `
    SELECT * FROM panelists WHERE panelist_id = ?`,
      [id],
    );

  update = (id, panelist) =>
    connection.execute(
      `UPDATE panelists SET first_name = ? , last_name = ? , academic_degree = ? WHERE panelist_id = ?`,
      [
        panelist.first_name,
        panelist.last_name,
        panelist.academic_degree || null,
        id,
      ],
    );

  remove = (id) =>
    connection.execute(`DELETE FROM panelists WHERE panelist_id = ?`, [id]);
}

module.exports = new PanelistRepository();
