const Utils                     = require("../helpers/utils");
const Location                  = require("../models/location-model");
const LocationNear              = require("../models/location-near-model");
const DataService               = require("../services/data-service");
const Types                     = require("../helpers/types");
const Weather                           =   require("../models/weather-model");

class LocationController {

    constructor(router) {
        this.router = router;
        this.routes();
        this.utils = new Utils();

        this.dataService = new DataService();
    }

    async list(req, res) {
        try {
            const locations = await Location.findAll({
                where: {
                    isDeleted: false
                },
                order: [["createOn", "ASC"]]
            });

            for (let i = 0; i < locations.length; i++) {
                const d = locations[i];
                d.date = this.utils.dateFormatter(d.createOn);
            };

            const data = {
                page: {
                    title: "Locations"
                },
                user: req.session.user,
                result: locations
            };

            return res.render("./location/list.ejs", data)

        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }

    async edit(req, res) {
        try {
            const location = await Location.findOne({
                where: {
                    locationId: req.params.locationId
                }
            });

            location.date = this.utils.dateFormatter(location.createOn);

            const data = {
                page: {
                    title: "Edit Location"
                },
                user: req.session.user,
                result: location
            };

            return res.render("./location/edit.ejs", data)
        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }

    async add(req, res) {
        try {

            const data = {
                page: {
                    title: "Add Location"
                },
                user: req.session.user
            };

            res.render("./location/add.ejs", data)

        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }

    async create(req, res) {
        try {
            let weathers = [];
            let locationType = '';
            if (req.body.locationType != "first") {
                locationType = req.body.locationType
            }
            let result = await this.dataService.location(req.body.placeName, Types.QueryReuired.LANGUAGE, Types.QueryReuired.FORMAT, locationType);

            for (let j = 0; j < result.location.address.length; j++) {
                let location = await Location.create({
                    isActive: true,
                    isDeleted: false,
                    address: result.location.address[j],
                    adminDistrict: result.location.adminDistrict[j],
                    adminDistrictCode: result.location.adminDistrictCode[j],
                    city: result.location.city[j],
                    country: result.location.country[j],
                    countryCode: result.location.countryCode[j],
                    displayName: result.location.displayName[j],
                    disputedArea: result.location.disputedArea[j],
                    ianaTimeZone: result.location.ianaTimeZone[j],
                    icaoCode: result.location.icaoCode[j],
                    locationCategory: result.location.locationCategory[j],
                    locId: result.location.locId[j],
                    latitude: result.location.latitude[j],
                    longitude: result.location.longitude[j],
                    neighborhood: result.location.neighborhood[j],
                    postalCode: result.location.postalCode[j],
                    placeId: result.location.placeId[j],
                    pwsId: result.location.pwsId[j],
                    type: result.location.type[j]
                });

                let result2 = await this.dataService.locationNear([result.location.latitude[j], result.location.longitude[j]], Types.QueryReuired.FORMAT, Types.QueryReuired.PRODUCT);
            
                for (let k = 0; k < result2.location.stationName.length; k++) {
                    let locationNear = await LocationNear.create({
                        isActive: true,
                        isDeleted: false,
                        locationId: location.locationId,
                        stationId: result2.location.stationId[k],
                        stationName: result2.location.stationName[k],
                        partnerId: result2.location.partnerId[k],
                        qcStatus: result2.location.qcStatus[k],
                        updateTimeUtc: result2.location.updateTimeUtc[k],
                        distanceKm: result2.location.distanceKm[k],
                        distanceMi: result2.location.distanceMi[k],
                        latitude: result2.location.latitude[k],
                        longitude: result2.location.longitude[k],
                    });
                    
                    
                    let result3 = await this.dataService.weather(result2.location.stationId[k], Types.QueryReuired.FORMAT, Types.QueryReuired.UNITS);
                    if(result3.observations != null){
                        await Weather.create({
                            isActive: true,
                            isDeleted: false,
                            locationNearId: locationNear.locationNearId,
                            epoch: result3.observations[0].epoch,
                            humidity: result3.observations[0].humidity,
                            latitude: result3.observations[0].lat,
                            longitude: result3.observations[0].lon,
                            neighborhood: result3.observations[0].neighborhood,
                            obsTimeLocal: result3.observations[0].obsTimeLocal,
                            obsTimeUtc: result3.observations[0].obsTimeUtc,
                            qcStatus: result3.observations[0].qcStatus,
                            realtimeFrequency: result3.observations[0].realtimeFrequency,
                            softwareType: result3.observations[0].softwareType,
                            solarRadiation: result3.observations[0].solarRadiation,
                            stationID: result3.observations[0].stationID,
                            uv: result3.observations[0].uv,
                            winddir: result3.observations[0].winddir,
                            imperial: result3.observations[0].imperial
                        });
                       
                    }
                };
            };
            return res.redirect("/location");
        }
        catch (error) {
            console.log(error);
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }

    async update(req, res) {
        try {
            await Location.update({
                isActive: true,
                isDeleted: false,
                address: req.body.address,
                adminDistrict: req.body.adminDistrict,
                adminDistrictCode: req.body.adminDistrictCode,
                city: req.body.city,
                country: req.body.country,
                countryCode: req.body.countryCode,
                displayName: req.body.displayName,
                disputedArea: req.body.disputedArea,
                ianaTimeZone: req.body.ianaTimeZone,
                icaoCode: req.body.icaoCode,
                locationCategory: req.body.locationCategory,
                locId: req.body.locId,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                neighborhood: req.body.neighborhood,
                postalCode: req.body.postalCode,
                placeId: req.body.placeId,
                pwsId: req.body.pwsId,
                type: req.body.type,
            }, {
                where: {
                    locationId: req.body.locationId
                }
            });

            return res.redirect("/location/edit/" + req.body.locationId);

        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }

    async status(req, res) {
        try {
            await Location.update({
                isActive: req.query.isActive === "true" ? true : false,
            }, {
                where: {
                    locationId: req.params.locationId
                }
            });

            return res.redirect("/location");

        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }


    async locationDelete(req, res) {
        try {
            await Location.update({
                isDeleted: true,
            }, {
                where: {
                    locationId: req.params.locationId
                }
            });

            return res.redirect("/location");
        }
        catch (error) {
            const data = {
                result: error
            }
            return res.render("./home/error.ejs", data);
        }
    }



    routes() {
        this.router.get("/", this.list.bind(this));
        this.router.get("/add", this.add.bind(this));
        this.router.get("/edit/:locationId", this.edit.bind(this));
        this.router.get("/status/:locationId", this.status.bind(this));
        this.router.get("/delete/:locationId", this.locationDelete.bind(this));

        this.router.post("/add", this.create.bind(this));
        this.router.post("/edit", this.update.bind(this));

    }

}

module.exports = LocationController;