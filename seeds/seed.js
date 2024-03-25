const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  { username: 'lizzieames', password: 'password1' },
 
];

const postData = [
  { title: 'Post 1', content: 'Test', userId: 1 },
  
];

const commentData = [
  { comment_text: 'Test Comment', userId: 1, postId: 1 },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true });
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
