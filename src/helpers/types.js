"use strict";

const Status = {
    ERROR: -1,
    NOTFOUND: 0,
    SUCCESS: 1
};


const UserType = {
    ROOT: 0,
    ADMIN: 1,
    NORMAL: 2
};

const QueryReuired = {
    LANGUAGE: "tr-TR",
    FORMAT: "json"
}

module.exports = {
    Status,
    UserType,
    QueryReuired
};