/**
 * Created by uriz on 03/02/2018.
 */
let passport = require('passport');

// create FB strategy
let FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
        clientID: "1151370004993163",
        clientSecret: "50bb09be87258f04b79883ddb4655512"
    }, function(accessToken, refreshToken, profile, done) {
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
            console.log("valid access toekn ")

            // set user on the req object
            req.user = user;

            next();
        }
    })(req, res,next);

};


module.exports = {

    "authenticateWithFB":authenticateWithFB
};