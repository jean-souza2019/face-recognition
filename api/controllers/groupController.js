class GroupController {
  constructor(groupUseCase) {
    this.groupUseCase = groupUseCase;
    this.createGroup = this.createGroup.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  async createGroup(req, res) {
    const { nome, permissao, status } = req.body;
    try {
      const group = await this.groupUseCase.createGroup({ nome, permissao, status });
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getGroups(req, res) {
    try {
      const groups = await this.groupUseCase.getAllGroups();
      res.json(groups);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = GroupController;
