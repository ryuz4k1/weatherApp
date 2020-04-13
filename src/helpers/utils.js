"use strict";

const packageJson    = require("../../package.json");
const Types          = require("../helpers/types");
const moment         = require("moment");

class Utils {
    
    // ... Set result
    setResult(code, message, data) {
        var result = {
            code: code,
            message: message,
            data: data,
            time: Date.now(),
            api: {
                author: packageJson.author,
                name: packageJson.name,
                description: packageJson.description,
                version: packageJson.version
            }
        }
        return result;
    };


    dateFormatter(cell) {
        if (!cell) {
              return "";
        }
        return moment(cell).add(3, "hours").format("MM/DD/YYYY HH:mm:ss");
    }


    userTypeFormatter(paymentTypeId) {
        switch (paymentTypeId) {
            case Types.UserType.NORMAL:
                return 'Normal User'
            case Types.UserType.ADMIN:
                return 'Admin'
            case Types.UserType.ROOT:
                return 'Root User'
        }
    }

}

module.exports = Utils;
