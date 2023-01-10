// to create models and sequilize them

const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection.js');

class Usercred extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.usercred_password);
  }
}

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
    usercred_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    // encript user password before storing in DB
    hooks: {
      beforeCreate:async (newUserData) => {
console.log(newUserData);
        newUserData.usercred_password = await bcrypt.hash(newUserData.usercred_password, 10);
        return newUserData;
      },
    },

    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'usercred',
  }
);

module.exports = Usercred;