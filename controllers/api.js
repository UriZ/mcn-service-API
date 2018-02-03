'use strict';
let passport = require('passport');

module.exports.createUser = function createUser (req, res, next) {

     res.send("ok!!!!!!" + JSON.stringify(req.user));

};



