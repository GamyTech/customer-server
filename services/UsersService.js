/* eslint-disable no-unused-vars */
const Service = require('./Service');
const db = require('../models')
const crypto = require('crypto')

/**
* Create New User
* Create a new user.
*
* inlineObject1 InlineObject1  (optional)
* returns User
* */
const createNewUser = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {

      if (body.password !== body.confirm_password) {
        const error = new Error('Password confirmation does not match! Please check again.')
        error.status = 400
        throw error
      }

      const salt = crypto.randomBytes(32).toString('hex')
      const hash = crypto.pbkdf2Sync(body.password, salt, 100000, 64, 'sha512').toString('hex');

      const isEmailAlreadTaken = await db.User.findOne({ where: { email: body.email } })
      if (isEmailAlreadTaken !== null) {
        const error = new Error('Email already used!')
        error.status = 409
        throw error
      }

      const newUser = await db.User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        user_name: body.user_name,
        email: body.email,
        birth_date: body.birth_date,
        hashed_password: hash,
        salt: salt,
        balance: 0
      })
      resolve(Service.successResponse(newUser));
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
* */
const getUserById = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: id } })
      if (user === null) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      resolve(Service.successResponse(user));
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
      const user = await db.User.findOne({ where: { user_name: dataFromToken.user_name } })
      if (user === null) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      resolve(Service.successResponse(user));
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
* */
const updateUserById = ({ id, body }) => new Promise(
  async (resolve, reject) => {
    try {
      if (await db.User.findOne({ where: { id: id } }) === null) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const statusOfUpdate = await db.User.update(body, { where: { id: id } })
      if (statusOfUpdate[0] == false) {
        const error = new Error('Bad data provided. Please check again')
        error.status = 400
        throw error
      }

      const user = await db.User.findOne({ where: { id: id } })

      resolve(Service.successResponse(user));
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
