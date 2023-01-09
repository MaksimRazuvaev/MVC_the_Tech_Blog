// to create models and sequilize them

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_header: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // update to false later
      allowNull: true, 
      references: {
        model: 'usercred',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: true, // to create timestamp column automaticly
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;