const express = require('express');
const validate = require('../validators/validate');
const { createGroupSchema, updateGroupSchema } = require('../validators/groupValidator');

module.exports = (groupController) => {
  const router = express.Router();

  router.post('/group', validate(createGroupSchema), groupController.createGroup);
  router.get('/groups', groupController.getGroups);
  router.put('/groups/:id', validate(updateGroupSchema), groupController.updateGroup);
  router.delete('/groups/:id', groupController.deleteGroup);

  return router;
};
