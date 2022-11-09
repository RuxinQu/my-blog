const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    async checkPassword(userData) {
        try {
            const matchPassword = await bcrypt.compare(userData.password, this.password);
            return matchPassword;
        } catch (err) { console.log(err) }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userData.password, salt);
                userData.password = hashedPassword;
            },
            beforeUpdate: async (userData) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userData.password, salt);
                userData.password = hashedPassword;
            }
        },
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'user',
    }
)

module.exports = User;