"use strict";
const express = require("express");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../config/config");
const Users = require('../models/UserModel');
const app = express();
app.use(passport.initialize());
app.use(passport.session());

console.log("made it here2")
// Setup work and export for the JWT passport strategy
module.exports = function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("made it here21")
            const user_id = jwt_payload._id;
            Users.findById(user_id, (err, results) => {
                if (err) {
                    console.log("made it here22")
                    return callback(err, false);
                }
                if (results) {
                    console.log("made it here23")
                    console.log(results)
                    callback(null, results);
                }
                else {
                    console.log("made it here24")
                    callback(null, false);
                }
            });
        })
    )
}

// exports.auth = auth;
module.exports.checkAuth = passport.authenticate("jwt", { session: false });


