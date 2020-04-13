const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const Location = sequelize.define("location", {
    locationId: {
        field: "locationId",
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
    address: {
        field: "address",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    adminDistrict: {
        field: "adminDistrict",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    adminDistrictCode: {
        field: "adminDistrictCode",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    airportName: {
        field: "airportName",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    city: {
        field: "city",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    country: {
        field: "country",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    countryCode: {
        field: "countryCode",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    displayName: {
        field: "displayName",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    disputedArea: {
        field: "disputedArea",
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    ianaTimeZone: {
        field: "ianaTimeZone",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    icaoCode: {
        field: "icaoCode",
        type: Sequelize.STRING(4),
        allowNull: true
    },
    locationCategory: {
        field: "locationCategory",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    locId: {
        field: "locId",
        type: Sequelize.STRING(255),
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
    postalCode: {
        field: "postalCode",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    placeId: {
        field: "placeId",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    pwsId: {
        field: "pwsId",
        type: Sequelize.STRING(255),
        allowNull: true
    },
    type: {
        field: "type",
        type: Sequelize.STRING(255),
        allowNull: false
    },
    createOn: {
        field: "createOn",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false });

module.exports = Location;
