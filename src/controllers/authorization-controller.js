"use strict";

const crypto      = require("crypto");
const Utils       = require("../helpers/utils");
const Types       = require("../helpers/types");
const User        = require("../models/user-model");

class AuthorizationController {

    constructor(router) {
        this.router = router;
        this.routers();

        this.utils = new Utils();
    }

    login(req, res) {
        return res.render("../views/authorization/login.ejs", { code: false });
    }

    async loginUser(req, res) { 
        try {
            // ... Password hash
            req.body.password = crypto.createHash("sha256").update(req.body.password).digest("hex");

            const result = await User.findOne({ where: { username: req.body.username, password: req.body.password, isDeleted: false }});
            if (!result) {
                return res.render("../views/authorization/login.ejs", { code: Types.Status.NOTFOUND });
            }
            
            // ... Save session
            req.session.user = result;

            return res.redirect("/");
        } 
        catch (err) {
            console.log(err);
        }

    }

    logout(req, res) {
        // ... Destroy sessison
        req.session.destroy();

        // ... Redirect
        return res.redirect("../views/authorization/login");
    }

    unauthorized(req, res) {
        return res.render("../views/authorization/unauthorized.ejs");
    }

    // ... Register routers
    routers() {
        this.router.get("/login", this.login.bind(this));
        this.router.get("/logout", this.logout.bind(this));
        this.router.get("/unauthorized", this.unauthorized.bind(this));
        this.router.post("/login", this.loginUser.bind(this));
    }
}

module.exports = AuthorizationController;