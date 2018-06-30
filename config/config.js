"use strict";
const express = require("express");
const rootpath = require("app-root-path");


var bodyParser = require('body-parser');

module.exports = function(app){
    app

    .use(express.static(rootpath+"/"))

    .get('*', (request, response) => {
        response.sendFile(rootpath+"/index.html");
    })

    //Use Body Parser here
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));


    // require('./db');

    //Require Application Core
    // require(rootpath+"/app/core")(app);

}
