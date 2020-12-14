/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../models')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
* Authenticate to the API
* Authenticate the user to the API
* */
const authenticate = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { user_name: body.user_name } });
      if (user === null) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const hashedFormDataPassword = crypto.pbkdf2Sync(body.password, user.salt, 100000, 64, 'sha512').toString('hex');
      if (user.hashed_password === hashedFormDataPassword) {
        const token = await jwt.sign({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          email: user.email,
          birth_date: user.birth_date,
          hashed_password: user.hashed_password,
          created_at: user.created_at,
          updated_at: user.updated_at
        }, process.env.JWT_SECRET, { expiresIn: '24h' })
        resolve(Service.successResponse({ token }));
      } else {
        const error = new Error('Bad credentials provided')
        error.status = 400
        throw error
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  authenticate,
};
