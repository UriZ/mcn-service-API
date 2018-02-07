'use strict';
let passport = require('passport');
let requestPromise = require('request-promise');

module.exports.getUser = function getUser (req, res, next) {

     res.send("ok!!!!!!" + JSON.stringify(req.user));

};


module.exports.createUser = function getUser (req, res, next) {

    console.log("create user called");
     if (req.user){


         console.log(process.env.USER_SERVICE_URL + " user service url");
         console.log(req.user.id);
         let options = {
             method: 'POST',
             uri: process.env.USER_SERVICE_URL,
             qs: {
                 fb_user_id: req.user.id,
                 fb_user_name: req.user.displayName,
                 email:req.user.emails[0]
             },
             headers: {
                 'User-Agent': 'Request-Promise'
             },
             json: true // Automatically parses the JSON string in the response
         };

         // call user service
         requestPromise(options)
             .then(function (result) {
                 console.log(result + " is the result from user services");
                 res.send(JSON.stringify(result));
             })
             .catch(function (err) {

                 console.log("error from user serivce  " +  err);
             });


     }
     else
          res.send("error!!!!!!" + JSON.stringify(req.user));

};



