// to create models and sequilize them

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Usercred extends Model {}

Usercred.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    usercred_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usercred_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'usercred',
  }
);

module.exports = Usercred;