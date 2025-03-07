const express = require('express');

module.exports = (groupController) => {
  const router = express.Router();

  router.post('/groups', groupController.createGroup);
  router.get('/groups', groupController.getGroups);

  return router;
};
