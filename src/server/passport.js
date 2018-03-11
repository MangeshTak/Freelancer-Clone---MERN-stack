var express = require('express');
var passport = require("passport");
var bodyParser = require('body-parser')
var cookieparser = require('cookie-parser')
var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2411",
  database: "freelancer",
  port : "3306"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


});

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
        console.log("getting");
    });


module.exports = function(passport) {

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done) {
    
            var sql = "SELECT * FROM USER WHERE USERNAME='"+username+"'";
            con.query(sql, function(err,rows){
                if (err)
                    return done(err);
                if(!rows.length){
                    console.log("No User found");
                    return done(null, "No user");     
                }
                else{
                    console.log("User found");
                    return done(null, rows[0].username);     
                }
            })            
         
       }));
};