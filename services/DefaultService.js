/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Your GET endpoint
* Get user details with the his token
*
* returns User
* */
const getUserWithToken = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
  getUserWithToken,
};
