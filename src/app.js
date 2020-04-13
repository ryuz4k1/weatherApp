'use strict';

const config                      = require("./config.json");
const session                     = require("express-session");
const json2xls                    = require("json2xls");
const express                     = require('express');
const cors                        = require('cors')
const bodyParser                  = require('body-parser');
const ejs                         = require('ejs');
const cookieParser                = require('cookie-parser');
const Utils                       = require('../src/helpers/utils');
const dotenv                      = require('dotenv').config();

//Controllers
const AuthorizationController     = require("./controllers/authorization-controller");
const HomeController              = require("./controllers/home-controller");
const LocationController          = require("./controllers/location-controller");
const WeatherController           = require("./controllers/weather-controller");
const UserController              = require("./controllers/user-controller");
const ReportsController           = require("./controllers/reports-controller");

// Middleware
const AuthenticationMiddleware    = require("./middleware/authentication-middleware");
const PermissionMiddleware        = require("./middleware/permission-middleware");
const ExceptionMiddleware         = require("./middleware/exception-middleware");


class App {
  constructor() {
      this.app = express();
      this.app.use(cors())

      this.config();
      this.controllers();

  }

  config() {

    //enables cors
    this.app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }));

    // Add headers
    this.app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

       // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });

    // ... Body parser
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.engine(".ejs", ejs.__express);
    this.app.set("views", __dirname + "/views");

    // ... Express session
    this.app.use(session({
      secret: "HDNDJ8H448FBVJ",
      resave: false,
      saveUninitialized: true
    }));

    this.app.use(json2xls.middleware);

  }

  controllers() {
    // ... Public path
    this.app.use("/public", express.static("public"));

    // ... Define routes 
    let router = express.Router();
    this.app.use("/authorization", router);
    new AuthorizationController(router);

    // ... Authentication middleware
    const authenticationMiddleware = new AuthenticationMiddleware();
    this.app.use(authenticationMiddleware.session);

    // ... Permission middleware
    const permissionMiddleware = new PermissionMiddleware();
    this.app.use(permissionMiddleware.check);

    // ... Home Controller
    router = express.Router();
    this.app.use("/", router);
    new HomeController(router);

    router = express.Router();
    this.app.use("/location", router);
    new LocationController(router);

    router = express.Router();
    this.app.use("/weather", router);
    new WeatherController(router);

    router = express.Router();
    this.app.use("/user-profile", router);
    new UserController(router);

    router = express.Router();
    this.app.use("/reports", router);
    new ReportsController(router);

    // ... Exception middleware
    const exceptionMiddleware = new ExceptionMiddleware();
    this.app.use(exceptionMiddleware.errorHandler);
  };

  getApp() {
    return this.app;
  }

}

module.exports = App;
