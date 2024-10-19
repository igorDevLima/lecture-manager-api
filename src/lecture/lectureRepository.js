const connection = require('../common/db/connection');

class LectureRepository {
  insert = (lecture) =>
    connection.execute(
      `INSERT INTO lectures (theme, begin_date_time, panelist_id, event_id ) VALUES (?, ?, ?, ?);`,
      [
        lecture.theme,
        lecture.begin_date_time,
        lecture.panelist_id,
        lecture.event_id,
      ],
    );

  findAll = () =>
    connection.execute(`
    SELECT * FROM lectures; 
  `);

  findById = (id) =>
    connection.execute(
      `
    SELECT * FROM lectures WHERE lecture_id = ?`,
      [id],
    );

  update = (id, lecture) =>
    connection.execute(
      `UPDATE lectures SET theme = ?, begin_date_time = ?, panelist_id = ?, event_id = ? WHERE lecture_id = ?`,
      [
        lecture.theme,
        lecture.begin_date_time,
        lecture.panelist_id,
        lecture.event_id,
        id,
      ],
    );

  remove = (id) =>
    connection.execute(`DELETE FROM lectures WHERE lecture_id = ?`, [id]);
}

module.exports = new LectureRepository();
