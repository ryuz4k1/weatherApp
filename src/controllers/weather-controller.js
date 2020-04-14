"use strict";
const Op                                =   require("sequelize").Op;
const moment                            =   require("moment");
const packageJson                       =   require("../../package.json");
const Utils                             =   require("../helpers/utils");
const Types                             =   require("../helpers/types");
const Location                          =   require("../models/location-model");
const LocationNear                      =   require("../models/location-near-model");
const Weather                           =   require("../models/weather-model");
const Connection                        = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

class WeatherController {

    constructor(router) {
        this.router = router;
        this.routers();

        this.utils = new Utils();

    }
    
    async list(req, res) {
        try {
            let locationNears = [];
            let weathers = [];
            let locations = [];

            locations = await Location.findAll({
                where: {
                    isDeleted: false
                },
                order: [["createOn", "ASC"]]
            });

           

            if(req.query.locationId) {
                locationNears = await LocationNear.findAll({
                    where: {
                        locationId: req.query.locationId,
                        isDeleted: false
                    },
                    order: [["createOn", "ASC"]]
                });
            };

            if (req.query.locationId && req.query.locationNearId && req.query.locationId != 0 && req.query.locationNearId != 0) {
                weathers = await Weather.findAll({
                    where: {
                        locationNearId: req.query.locationNearId
                    },
                    order: [["createOn", "ASC"]]
                });


                for (let i = 0; i < weathers.length; i++) {
                    const d = weathers[i];
                    d.date  = this.utils.dateFormatter(d.createOn);
                };

            };
            
            const data = {
                page: {
                    title: "Weather"
                },
                user: req.session.user,
                locations: locations,
                locationNears: locationNears,
                locationId: req.query.locationId,
                locationNearId: req.query.locationNearId,
                result: weathers
            };

            return res.render("./weather/list.ejs", data)
            
        } 
        catch (error) {
            const data = {
                result: error
            }    
            return res.render("./home/error.ejs", data);
        }
    }

    async detail(req, res) {
        try {

            const locationNear = await LocationNear.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    locationNearId: req.params.locationNearId
                }
            });

            const weather = await Weather.findOne({
                where: {
                    locationNearId: locationNear.locationNearId
                }
            });


            const data = {
                page: {
                    title: "Weather Detail"
                },
                user: req.session.user,
                locationName: locationNear.stationName,
                locationNearId: req.params.locationNearId,
                result: weather          
            };

            res.render("./weather/detail.ejs", data)
        } 
        catch (error) {
            const data = {
                result: error
            }    
            return res.render("./home/error.ejs", data);
        }
    }

    async getCoordinates(req,res) {
        try {
            const coordinate = await LocationNear.findOne({
                where: {
                    locationNearId: req.params.locationNearId
                }
            });

            return res.send(this.utils.setResult(Types.Status.SUCCESS, "success", coordinate));
        } catch (error) {
            return res.send(error);
        }
    }
   

    error(req, res) {

        const data = {
            message: req.query.message
        }

        return res.render("../views/home/error.ejs", data);
    }


    // ... Register routers
    routers() {
        this.router.get("/", this.list.bind(this));
        this.router.get("/detail/:locationNearId", this.detail.bind(this));
        this.router.get("/getCoordinates/:locationNearId", this.getCoordinates.bind(this));
        this.router.get("/error", this.error.bind(this));
    }
}

module.exports = WeatherController;