const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const User = sequelize.define("user", {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    type: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    permission: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    },
    verificationCode: {
        type: Sequelize.STRING
    },
    externalId: {
        type: Sequelize.STRING
    },
    secretKey: {
        type: Sequelize.STRING
    },
    createOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false });

module.exports = User;