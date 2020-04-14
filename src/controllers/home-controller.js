"use strict";
const Op                                =   require("sequelize").Op;
const moment                            =   require("moment");
const packageJson                       =   require("../../package.json");
const Utils                             =   require("../helpers/utils");
const Types                             =   require("../helpers/types");
const DataService                       =   require("../services/data-service");
const Weather                           =   require("../models/weather-model");


class HomeController {

    constructor(router) {
        this.router = router;
        this.routers();

        this.utils = new Utils();
        this.dataService = new DataService();
    }
    
    // ... Index
    async index(req, res) {

        const data = {
            page: {
                title: "Dashboard"
            },
            user: req.session.user,
            version: packageJson.version
        };
        
        return res.render("./home/dashboard.ejs", data);
    }

    error(req, res) {

        const data = {
            message: req.query.message
        }

        return res.render("../views/home/error.ejs", data);
    }


    async enviroment(req, res, next){
        try {
            const envData = await config[process.env.NODE_ENV || 'development'];
            res.json(envData);
        } 
        catch (error) {
            console.log(error);
        }
    }

    // ... Register routers
    routers() {
        this.router.get("/", this.index.bind(this));
        this.router.get("/error", this.error.bind(this));
        this.router.get("/enviroment", this.enviroment.bind(this));
    }
}

module.exports = HomeController;