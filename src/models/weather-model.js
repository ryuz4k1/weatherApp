const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const Weather = sequelize.define("weather", {
    weatherId: {
        field: "weatherId",
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        field: "isActive",
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    isDeleted: {
        field: "isDeleted",
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    locationNearId: {
        field: "locationNearId",
        type: Sequelize.INTEGER,
        allowNull: true
    },
    epoch: {
        field: "epoch",
        type: Sequelize.INTEGER,
        allowNull: true
    },
    humidity: {
        field: "humidity",
        type: Sequelize.INTEGER,
        allowNull: true
    },
    latitude: {
        field: "latitude",
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    longitude: {
        field: "longitude",
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    neighborhood: {
        field: "neighborhood",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    obsTimeLocal: {
        field: "obsTimeLocal",
        type: Sequelize.DATE,
    },
    obsTimeUtc: {
        field: "obsTimeUtc",
        type: Sequelize.DATE,
    },
    qcStatus: {
        field: "qcStatus",
        type: Sequelize.STRING(10),
        allowNull: true
    },
    realtimeFrequency: {
        field: "realtimeFrequency",
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    softwareType: {
        field: "softwareType",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    solarRadiation: {
        field: "solarRadiation",
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    stationID: {
        field: "stationID",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    uv: {
        field: "uv",
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    winddir: {
        field: "winddir",
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    imperial: {
        field: "imperial",
        type: Sequelize.JSON
    },
    createOn: {
        field: "createOn",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false });

module.exports = Weather;
