const { Comment } = require('../models');

const commentdata = [
  {
    comment_body: 'Comment 1',
    post_id: 1,
  },
  {
    comment_body: 'Comment 2',
    post_id: 1,
  },
  {
    comment_body: 'Comment 3',
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;