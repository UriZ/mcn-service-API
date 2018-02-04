'use strict';
let passport = require('passport');
let requestPromise = require('request-promise');

module.exports.getUser = function getUser (req, res, next) {

     res.send("ok!!!!!!" + JSON.stringify(req.user));

};


module.exports.createUser = function getUser (req, res, next) {

    console.log("create user called");
     if (req.user){


         console.log("building options");
         console.log(req.user.id.value);
         console.log(req.user.id);
         let options = {
             uri: "https://mcn-user-service.herokuapp.com/api/users",
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

         requestPromise(options)
             .then(function (result) {
                 console.log(result);
                 res.send(result)
             })
             .catch(function (err) {
                 // API call failed...
             });


     }
     else
          res.send("error!!!!!!" + JSON.stringify(req.user));

};



