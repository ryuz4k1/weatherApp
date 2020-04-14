const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const LocationNear = sequelize.define("locationNear", {
    locationNearId: {
        field: "locationNearId",
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        field: "isActive",
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    isDeleted: {
        field: "isDeleted",
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    locationId: {
        field: "locationId",
        type: Sequelize.INTEGER,
        allowNull: true
    },
    stationId: {
        field: "stationId",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    stationName: {
        field: "stationName",
        type: Sequelize.STRING(255),
        allowNull: false
    },
    partnerId: {
        field: "partnerId",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    qcStatus: {
        field: "qcStatus",
        type: Sequelize.STRING(1),
        allowNull: true
    },
    updateTimeUtc: {
        field: "updateTimeUtc",
        type: Sequelize.DATE,
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
    distanceKm: {
        field: "distanceKm",
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    distanceMi: {
        field: "distanceMi",
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    createOn: {
        field: "createOn",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false });

module.exports = LocationNear;
