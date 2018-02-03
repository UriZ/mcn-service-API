'use strict';
let passport = require('passport');

module.exports.getUser = function getUser (req, res, next) {

     res.send("ok!!!!!!" + JSON.stringify(req.user));

};


module.exports.createUser = function getUser (req, res, next) {

     res.send("user created!!!!!!" + JSON.stringify(req.user));

};



