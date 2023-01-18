// relationship between models

// import models
const Comment = require('./Comment');
const Post = require('./Post');
const Usercred = require('./Usercred');

// Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  //
  onDelete: 'CASCADE',

});

// Post have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Post belongsTo User
Post.belongsTo(Usercred, {
  foreignKey: 'user_id',
  //
  onDelete: 'CASCADE',

});

// User have many Posts
Usercred.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment belongsTo User
Comment.belongsTo(Usercred, {
  foreignKey: 'user_id',
  //
  onDelete: 'CASCADE',

});

// User have many Posts
Usercred.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


module.exports = {
    Comment,
    Post,
    Usercred,
};