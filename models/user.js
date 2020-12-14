'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    salt: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    birth_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};