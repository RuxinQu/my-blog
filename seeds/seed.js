const { Post, User, Comment } = require('../models/index');
const userData = require('./userSeedData.json')

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const seedUser = User.bulkCreate(userData, { individualHooks: true });
    await Promise.all([seedUser]);
    process.exit(0);
}

seedDatabase();