class GroupController {
  constructor(groupUseCase) {
    this.groupUseCase = groupUseCase;
    this.createGroup = this.createGroup.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  async createGroup(req, res) {
    const { name, permission, status } = req.body;
    try {
      const group = await this.groupUseCase.createGroup({ name, permission, status });
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getGroups(req, res) {
    try {
      const filters = req.query;
      let groups;
      if (Object.keys(filters).length) {
        groups = await this.groupUseCase.getFilteredGroups(filters);
      } else {
        groups = await this.groupUseCase.getAllGroups();
      }
      res.json(groups);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateGroup(req, res) {
    try {
      const groupId = req.params.id;
      const updatedGroup = await this.groupUseCase.updateGroup(groupId, req.body);
      res.json(updatedGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteGroup(req, res) {
    try {
      const groupId = req.params.id;
      await this.groupUseCase.deleteGroup(groupId);
      res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = GroupController;
