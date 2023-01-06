// relationship between models

// import models
const Comment = require('./Comment');
const Post = require('./Post');
const Usercred = require('./Usercred');

// Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// Post have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});


module.exports = {
    Comment,
    Post,
    Usercred,
};