'use strict';
let passport = require('passport');
let requestPromise = require('request-promise');

module.exports.getUser = function getUser (req, res, next) {


    if (req.user){

        // fb token is valid


        // options for user service call
        let options = {
            method: 'get',
            uri: process.env.USER_SERVICE_URL,
            qs: {
                fb_user_id: req.user.id
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };


        requestPromise(options)
            .then(function (result) {
                res.send(JSON.stringify(result));
            })
            .catch(function (err) {

                console.log("error from user service  " +  err);
                res.send(err);
            });


    }
    else {
        res.send("error - missing identity on request");

    }


};


/**
 * signup - create new user
 * @param req
 * @param res
 * @param next
 */
module.exports.createUser = function signup (req, res, next) {

     if (req.user){

         // options for user service call
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
                 console.log(result + " is the result from user service");
                 res.send(JSON.stringify(result));
             })
             .catch(function (err) {

                 console.log("error from user service  " +  err);
                 res.status(500).send(err);
             });
     }
     else
          res.status(401).send("errro creating user - missing identity on req");

};



