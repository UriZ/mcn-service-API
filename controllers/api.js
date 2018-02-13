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
                console.log("success getting user");

                if (result != null){
                    res.status(200).send(JSON.stringify(result));
                }
                else{
                    res.status(500).send("no user found in db");
                }
            })
            .catch(function (err) {

                console.log("error getting user from db " +  err);
                res.status(500).send(err);
            });


    }
    else {
        res.status(401).send("error - missing identity on request");

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
                 res.status(200).send(JSON.stringify(result));
             })
             .catch(function (err) {

                 console.log("error creating user " +  err);
                 res.status(500).send(err);
             });
     }
     else
          res.status(401).send("errro creating user - missing identity on req");

};

/**
 * get user preferences from db
 * @param req
 * @param res
 */
module.exports.getUserPref = (req, res)=>{
    if (req.user){

        // options for user service call
        let options = {
            method: 'get',
            uri: process.env.USER_SERVICE_URL +"/" + req.user.id  + "/preferences",
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };


        requestPromise(options)
            .then(function (result) {
                console.log("success getting user pref");

                if (result != null){
                    res.status(200).send(JSON.stringify(result));
                }
                else{
                    res.status(500).send("no user pref found in db");
                }
            })
            .catch(function (err) {

                console.log("error getting user pref from db " +  err);
                res.status(500).send(err);
            });


    }
    else
        res.status(401).send("errro creating user - missing identity on req");

}
