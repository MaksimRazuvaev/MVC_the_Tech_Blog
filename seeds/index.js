const sequelize = require('../config/connection');
const seedPost = require('./postsData');
const seedComment = require('./commentsData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();
