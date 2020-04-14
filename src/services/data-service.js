"use strict";

const axios   = require("axios");
const Types   = require("../helpers/types");
const config  = require("../config.json"); 
const request = require('request');


class DataService {

    async location(query, language, format, locationType) {

        let url = process.env.API_URL + "v3/location/search?query=" + query + "&language=" + language + "&format=" + format + "&apiKey=" + process.env.API_KEY;

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

    async locationNear(geocode, format, product) {

        let url = process.env.API_URL + "v3/location/near?geocode=" + geocode[0] + "," + geocode[1] + "&format=" + format + "&product=" + product + "&apiKey=" + process.env.API_KEY;

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

    async weather(stationId, format, units) {

        let url = process.env.API_URL + "v2/pws/observations/current?stationId=" + stationId + "&format=" + format + "&units=" + units + "&apiKey=" + process.env.API_KEY;

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