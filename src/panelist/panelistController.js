const { NotFoundError, ConflictError } = require("../common/helpers/api-error");
const {
  OKResponse,
  CreatedResponse,
} = require("../common/helpers/api-success");
const panelistRepository = require("./panelistRepository");

class PanelistController {
  async showAll(req, res) {
    const [allPanelists] = await panelistRepository.findAll();

    return new OKResponse("All panelists found!", allPanelists).send(res);
  }

  async showById(req, res) {
    const { id } = req.params;

    const [panelistById] = await panelistRepository.findById(id);

    if (panelistById.length == 0) throw new NotFoundError("Panelist not found");

    return new OKResponse("Panelist found!", panelistById).send(res);
  }

  async create(req, res) {
    const panelistBody = req.body;

    const [newPanelist] = await panelistRepository.insert(panelistBody);

    return new CreatedResponse("Panelist created!", newPanelist).send(res);
  }

  async update(req, res) {
    const panelistBody = req.body;
    const { id } = req.params;

    const [panelistById] = await panelistRepository.findById(id);

    if (panelistById.length == 0) throw new NotFoundError("Panelist not found");

    const [updatePanelist] = await panelistRepository.update(id, panelistBody);

    return new OKResponse("Panelist updated!", updatePanelist).send(res);
  }

  async delete(req, res) {
    const { id } = req.params;

    const [panelistById] = await panelistRepository.findById(id);

    if (panelistById.length == 0) throw new NotFoundError("Panelist not found");

    const [deletePanelist] = await panelistRepository.remove(id);

    return new OKResponse("Panelist deleted!", deletePanelist).send(res);
  }
}

module.exports = new PanelistController();
