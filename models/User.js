const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    async matchPassword(userData) {
        try {
            return await bcrypt.compare(userData.password, this.password);
        } catch (err) { console.log(err) }
    }
};

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
            unique: true
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
                is: /^[0-9a-f]{64}$/i
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                const salt = bcrypt.genSalt(10);
                const hashedPassword = bcrypt.hash(userData.password, salt);
                userData.password = hashedPassword;
            },
            beforeUpdate: async (userData) => {
                const salt = bcrypt.genSalt(10);
                const hashedPassword = bcrypt.hash(userData.password, salt);
                userData.password = hashedPassword;
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'user',
    }
)

module.exports = User;