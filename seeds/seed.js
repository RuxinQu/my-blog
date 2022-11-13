const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/index');
const userData = require('./userSeedData.json');
const postData = require('./postSeedData.json');
const commentData = require('./commentSeedData.json');

//the await for post and comment are necessary otherwise the data the foreign key refers to may not be implemented yet
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, { individualHooks: true });
    await Post.bulkCreate(postData, { individualHooks: true });
    await Comment.bulkCreate(commentData, { individualHooks: true });
    process.exit(0);
};

seedDatabase();