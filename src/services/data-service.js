"use strict";

const axios   = require("axios");
const Types   = require("../helpers/types");
const config  = require("../config.json"); 
const request = require('request');


class DataService {

    async location(query, language, format, locationType) {

        let url = process.env.API_URL + "/search?query=" + query + "&language=" + language + "&format=" + format + "&apiKey=" + process.env.API_KEY;

        if (locationType) {
            url += "&locationType=" + locationType;
        }
        

        const options = {
            url: url,
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }

        const response = await axios(options);
        return response.data;
    }

}

module.exports = DataService;