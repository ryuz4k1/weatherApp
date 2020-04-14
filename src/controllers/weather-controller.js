"use strict";
const Op                                =   require("sequelize").Op;
const moment                            =   require("moment");
const packageJson                       =   require("../../package.json");
const Utils                             =   require("../helpers/utils");
const Types                             =   require("../helpers/types");
const Location                          =   require("../models/location-model");
const LocationNear                      =   require("../models/location-near-model");
const Weather                           =   require("../models/weather-model");



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

            let locations = await Location.findAll({
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

            //console.log(locations);
            
            const data = {
                page: {
                    title: "Locations"
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

    error(req, res) {

        const data = {
            message: req.query.message
        }

        return res.render("../views/home/error.ejs", data);
    }


    // ... Register routers
    routers() {
        this.router.get("/", this.list.bind(this));
        this.router.get("/error", this.error.bind(this));
    }
}

module.exports = WeatherController;