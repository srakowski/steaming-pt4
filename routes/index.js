var express = require('express');
var Steamer = require('../models/steamer')
var router = express.Router();

router.get('/', function(req, res, next) {
    Steamer.find().sort('-dateCreated').limit(10).exec(function (err, steamers) {
        res.render('index', { steamers: steamers });        
    });
});

router.get('/create', function (req, res, next) {
    if (!req.isAuthenticated()) { 
        return res.redirect("/sign/in");
    }
        
    res.render('create');
});

function createPermalinkKey(title) {
    return title.replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/^\s+|\s+$/, '')
        .replace(/\s+/g, '-')
        .toLowerCase();     
};

router.post('/create', function (req, res, next) {
    if (!req.isAuthenticated()) { 
        return res.redirect("/sign/in");
    }
    
    new Steamer({
        author: req.user.username,
        title: req.body.title,
        permalinkKey: createPermalinkKey(req.body.title),
        content: req.body.content
    }).save(function (err, newPost) {
        if (err) {
            return next(err);
        } else {                
            res.redirect('/steamers/' + newPost.permalinkKey)
        }
    });            
});

router.get('/steamers/:permalinkKey', function (req, res, next) {
    Steamer.findOne({ permalinkKey: req.params.permalinkKey }).exec( 
        function (err, steamer) {
            if (err) {
                return next(err);
            }        
                        
            res.render("steamer", steamer);
        });
});

module.exports = router;
