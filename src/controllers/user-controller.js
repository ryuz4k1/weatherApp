const Utils                 =   require("../helpers/utils");
const User                  =   require("../models/user-model");


class UserController {
    
    constructor(router) {
        this.router = router;
        this.routes();
        this.utils = new Utils();
    }

    async list(req, res) {
        try {
            const users = await User.findAll({
                order: [["createOn", "ASC"]]
            });

            for (let i = 0; i < users.length; i++) {
                const d = users[i];
                d.date  = this.utils.dateFormatter(d.createOn);
                d.type  = this.utils.userTypeFormatter(d.type);
            };

            const data = {
                page: {
                    title: "Users"
                },
                user: req.session.user,
                result: users
            };

            return res.render("./user/list.ejs", data)
            
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
            const user = await User.findOne({
                where: {
                    userId: req.params.userId  
                }
            });

            const data = {
                page: {
                    title: "Edit user"
                },
                user: req.session.user,
                result: user
            };

            return res.render("./user/edit.ejs", data)
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
                    title: "Add user"
                },
                user: req.session.user                
            };

            res.render("./user/add.ejs", data)
            
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
            await User.create({
                isActive: true,
                isDeleted: false,
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                showOnApp: true
            });

            return res.redirect("/user-profile");
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
            await User.update({
                isActive: true,
                isDeleted: false,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.userName,
                phone: req.body.phone,
                }, {
                where: {
                    userId: req.body.userId
                }
            });

            return res.redirect("/user-profile/edit/" + req.body.userId);
            
        } 
        catch (error) {
            console.log(error);
            const data = {
                result: error
            }    
            return res.render("./home/error.ejs", data);
        }
    }

    async status(req, res) {
        try {
            await User.update({
                isActive: req.query.isActive === "true" ? true : false,
                }, {
                where: {
                    userId: req.params.userId
                }
            });

            return res.redirect("/user-profile");
            
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
        this.router.get("/edit/:userId", this.edit.bind(this));
        this.router.get("/status/:userId", this.status.bind(this));

        this.router.post("/add", this.create.bind(this));
        this.router.post("/edit", this.update.bind(this));

    }

}

module.exports = UserController;