const Utils                 =   require("../helpers/utils");
const Location              =   require("../models/location-model");
const DataService           =   require("../services/data-service");
const Types                 =   require("../helpers/types");

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
                d.date  = this.utils.dateFormatter(d.createOn);
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
            let locationType = '';
            if(req.body.locationType != "first"){
                locationType = req.body.locationType
            }
            let result = await this.dataService.location(req.body.placeName, Types.QueryReuired.LANGUAGE, Types.QueryReuired.FORMAT, locationType);

            for (let j = 0; j < result.location.address.length; j++) {
    
                await Location.create({
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
                    type: result.location.type[j],
                });
                
            };
            return res.send(result.location);
            
            
            

            //return res.redirect("/location");
        } 
        catch (error) {
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
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                showOnApp: true
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


    async locationDelete(req ,res) {
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