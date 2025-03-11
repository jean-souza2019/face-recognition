class GroupUseCase {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async createGroup({ name, permission, status }) {
    const group = await this.groupRepository.createGroup({ name, permission, status });
    return group;
  }

  async getAllGroups() {
    const groups = await this.groupRepository.getAllGroups();
    return groups;
  }

  async getFilteredGroups(filters) {
    const groups = await this.groupRepository.getFilteredGroups(filters);
    return groups;
  }

  async updateGroup(id, groupData) {
    const updatedGroup = await this.groupRepository.updateGroup(id, groupData);
    return updatedGroup;
  }

  async deleteGroup(id) {
    const result = await this.groupRepository.deleteGroup(id);
    return result;
  }
}

module.exports = GroupUseCase;
