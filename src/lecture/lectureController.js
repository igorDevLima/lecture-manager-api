const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require('../common/helpers/api-error');
const {
  OKResponse,
  CreatedResponse,
} = require('../common/helpers/api-success');
const lectureRepository = require('./lectureRepository');
const panelistRepository = require('../panelist/panelistRepository');
const eventRepository = require('../event/eventRepository');

class LectureController {
  async showAll(req, res) {
    const [allLectures] = await lectureRepository.findAll();

    return new OKResponse('All lectures found!', allLectures).send(res);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [lectureById] = await lectureRepository.findById(id);

    if (lectureById.length == 0) throw new NotFoundError('Lecture not found');

    return new OKResponse('Lecture found!', lectureById).send(res);
  }

  async create(req, res) {
    const lectureBody = req.body;

    const [existPanelist] = await panelistRepository.findById(
      lectureBody.panelist_id,
    );

    if (existPanelist.length == 0)
      throw new BadRequestError(
        'Panelist not found! Please insert a registered panelist.',
      );

    const [existEvent] = await eventRepository.findById(lectureBody.event_id);

    if (existEvent.length == 0) {
      throw new BadRequestError(
        'Event not found! Please insert a registered event.',
      );
    }

    if (
      new Date(lectureBody.begin_date_time) < existEvent[0].begin_date_time ||
      new Date(lectureBody.begin_date_time) > existEvent[0].end_date_time
    )
      throw new BadRequestError(
        'The start date and time of the lecture do not match the date and time of the selected event.',
      );

    const [newLecture] = await lectureRepository.insert(lectureBody);

    return new CreatedResponse('Lecture created!', newLecture).send(res);
  }

  async update(req, res) {
    const lectureBody = req.body;
    const { id } = req.params;

    const [lectureById] = await lectureRepository.findById(id);

    if (lectureById.length == 0) throw new NotFoundError('Lecture not found');

    const [updateLecture] = await lectureRepository.update(id, lectureBody);

    return new OKResponse('Lecture updated!', updateLecture).send(res);
  }

  async delete(req, res) {
    const { id } = req.params;

    const [lectureById] = await lectureRepository.findById(id);

    if (lectureById.length == 0) throw new NotFoundError('Lecture not found');

    const [deleteLecture] = await lectureRepository.remove(id);

    return new OKResponse('Lecture deleted!', deleteLecture).send(res);
  }
}

module.exports = new LectureController();
