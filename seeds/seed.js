const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/index');
const userData = require('./userSeedData.json');
const postData = require('./postSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, { individualHooks: true });
    await Post.bulkCreate(postData, { individualHooks: true });
    // await Promise.all([seedUser, seedPost]);
    process.exit(0);
}

seedDatabase();