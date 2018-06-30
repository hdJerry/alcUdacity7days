"use strict";

const express = require('express');
const app = express();


require("./config/config")(app);

app.listen(7777, function(){
    console.log('App Started by '+ new Date());
});
