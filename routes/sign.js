var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../models/user");

router.get("/up", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
            
    res.render('signup');        
});

router.post("/up", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
      
    User.register(new User({ username: req.body.username }), req.body.password, function (err) {
        if (err) {
            return res.render('signup', { error: err.message});            
        }        
                                
        passport.authenticate('local')(req, res, function () {                               
            res.redirect('/');
        });        
    });
});

router.get("/in", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    
    res.render("signin");
});

router.post('/in', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.render('signin', { error: err.message});
        }
        
        if (!user) { 
            return res.render('signin', { error: "Invalid username/password"}); 
        }
        
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
        
    })(req, res, next);
});

router.get("/out",
    function (req, res) {    
        req.logout();
        res.redirect('/');
    }
);

module.exports = router;