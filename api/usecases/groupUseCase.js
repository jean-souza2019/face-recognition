class GroupUseCase {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async createGroup({ nome, permissao, status }) {
    const group = await this.groupRepository.createGroup({ nome, permissao, status });
    return group;
  }

  async getAllGroups() {
    const groups = await this.groupRepository.getAllGroups();
    return groups;
  }
}

module.exports = GroupUseCase;
