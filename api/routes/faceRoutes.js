const express = require('express');
const validate = require('../validators/validate');
const { faceRegistrationSchema, faceVerificationSchema } = require('../validators/faceValidator');

module.exports = (faceController) => {
  const router = express.Router();

  router.post('/face', validate(faceRegistrationSchema), (req, res) => {
    // #swagger.tags = ['Face']
    // #swagger.summary = 'Register face data for a user'
    // #swagger.description = 'Registers the facial data for a user. The user must be already registered and provide a valid login and facial descriptor.'

    // Formato correto para Swagger-Autogen:
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["login", "descriptor"],
              properties: {
                login: {
                  type: "string",
                  description: "The login (username) of the user",
                  example: "johndoe"
                },
                descriptor: {
                  type: "array",
                  items: { type: "number" },
                  description: "Facial descriptor as an array of numbers",
                  example: [0.1, 0.2, 0.3, 0.4, 0.5]
                }
              }
            }
          }
        }
      }
    */
    faceController.registerFace(req, res);
  });

  router.post('/face/verify', validate(faceVerificationSchema), (req, res) => {
    // #swagger.tags = ['Face']
    // #swagger.summary = 'Verify face data and return matching user'
    // #swagger.description = 'Verifies the provided facial descriptor against the stored data for the specified user. Returns the matching user if the comparison is within the defined threshold.'

    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["login", "descriptor"],
              properties: {
                login: {
                  type: "string",
                  description: "The login (username) of the user",
                  example: "johndoe"
                },
                descriptor: {
                  type: "array",
                  items: { type: "number" },
                  description: "Facial descriptor as an array of numbers",
                  example: [0.1, 0.2, 0.3, 0.4, 0.5]
                }
              }
            }
          }
        }
      }
    */

    faceController.verifyFace(req, res);
  });

  return router;
};
