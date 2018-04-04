'use strict';
let passport = require('passport');
let requestPromise = require('request-promise');

module.exports.getUser = function getUser (req, res, next) {


    if (req.user){

        // fb token is valid


        // options for user service call
        let options = {
            method: 'get',
            uri: process.env.USER_SERVICE_URL + "/" +req.user.id +"/",
            // qs: {
            //     userID: req.user.id
            // },
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
                 email:req.user.emails[0],
                 profilePic:req.user.photos[0].value
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

                 // we use err.error since request promise transforms the err object
                 console.log("error creating user " +  JSON.stringify(err.error));
                 res.status(500).send(err.error);
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

        alert(JSON.stringify(req.user));

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
                    res.status(200).send(result);
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

module.exports.updateUserPref = (req,res)=>{
    if (req.user){


        let preferencesFromRequest = req.swagger.params.preferences.value;


        // options for user service call
        let options = {
            method: 'put',
            uri: process.env.USER_SERVICE_URL +"/" + req.user.id  + "/preferences",
            headers: {
                'User-Agent': 'Request-Promise'
            },
            body: preferencesFromRequest,
            json: true // Automatically parses the JSON string in the response
        };


        requestPromise(options)
            .then(function (result) {
                console.log("success updating user pref");

                    res.status(200).send(result);
            })
            .catch(function (err) {

                console.log("error updating user pref  " +  err);
                res.status(500).send(err);
            });


    }
    else
        res.status(401).send("errro creating user - missing identity on req");

};


const extractTokenFromHeader = (req)=>{

    // get authorization header
    let tokenHeader = req.headers['authorization'];

    if (tokenHeader.startsWith("Bearer ")){

        let token = tokenHeader.substring("Bearer ".length);
        return token;
    }
    else{
        return null;
    }
};

module.exports.getMatchForUser = (req,res)=>{

    if (req.user){

        let fb_user_id = req.user.id;
        let token = extractTokenFromHeader(req);

        if (!token){
            res.status(400).send("malformed Authorization header");
        }
        // options for match service call
        let options = {
            method: 'get',
            uri: process.env.MATCHING_SERVICE_URL,
            qs:{
                "fb_user_id":fb_user_id,
                "fbToken":token
            },

            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };


        requestPromise(options)
            .then(function (result) {
                console.log("success finding a match");

                res.status(200).send(result);
            })
            .catch(function (err) {

                console.log("error finding match " +  err);
                res.status(500).send(err);
            });
    }
    else{
        res.status(401).send("error finding match for user - missing identity on req");

    }


};