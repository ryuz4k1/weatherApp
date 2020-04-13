"use strict";

class AuthenticationMiddleware {
    // ... Session
    session(req, res, next) {
        if (req.session.user) {
            return next();
        }
        else {
            return res.redirect("/authorization/login");
        }
    }
}

module.exports = AuthenticationMiddleware;