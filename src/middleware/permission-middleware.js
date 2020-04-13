"use strict";

const config = require("../config.json");

class PermissionMiddleware {
    // ... Check app token 
    check(req, res, next) {

        const pagePermission = config.permission[req.path];

        if (pagePermission) {
                
            if ((pagePermission << 0).toString(2) & (req.session.user.permission << 0).toString(2)) {
                return next();
            }
            else {
                return res.redirect("/authorization/unauthorized")
            }
        }
        return next();
    }

}

module.exports = PermissionMiddleware;