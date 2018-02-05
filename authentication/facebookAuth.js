/**
 * Created by uriz on 03/02/2018.
 */
let passport = require('passport');

// create FB strategy
let FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET
    }, function(accessToken, refreshToken, profile, done) {
        console.log("verify called");
        done(null, profile);
    }
));

/**
 * middleware that authenticates every request with FB (requires access token)
 * @param req
 * @param res
 * @param next
 */
let authenticateWithFB =  function createUser (req, res, next) {

    passport.authenticate('facebook-token',{ session: false }, function (err, user, info) {
        if(err){
            console.log("error in validating access token ")
            if(err.oauthError){
                var oauthError = JSON.parse(err.oauthError.data);
                console.log("oauth error ")

                res.send(oauthError.error.message + " " + info);
            } else {
                console.log("some other error")

                res.send(err);
            }
        } else {

            if (!user){

                // this happens when there is only bearer in the header
                res.send("error validating user - missing token value")
            }
            else{
                console.log("valid access toekn ")

                // set user on the req object
                req.user = user;

                next();
            }


        }
    })(req, res,next);

};


module.exports = {

    "authenticateWithFB":authenticateWithFB
};