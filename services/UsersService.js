/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create New User
* Create a new user.
*
* inlineObject1 InlineObject1  (optional)
* returns User
* */
const createNewUser = ({ inlineObject1 }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        inlineObject1,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get user by id
* Retrieve the information of the user with the matching user ID.
*
* id String 
* bearer String Bearer Token to path in order to use the API
* returns User
* */
const getUserById = ({ id, bearer }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        bearer,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Your GET endpoint
* Get user details with the his token
*
* returns User
* */
const getUserWithToken = (body, dataFromToken) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(dataFromToken));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update user by id
* Update the infromation of an existing user by its id.
*
* id String 
* bearer String Bearer Token
* inlineObject InlineObject  (optional)
* returns User
* */
const updateUserById = ({ id, bearer, inlineObject }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        bearer,
        inlineObject,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createNewUser,
  getUserById,
  getUserWithToken,
  updateUserById,
};
