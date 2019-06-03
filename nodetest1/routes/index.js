var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Makers BnB' });
});

/* GET Userlist page. */
router.get('/successful', function(req, res) {
    res.render('successful', { title: 'Sign Up Successful' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var emailaddress = req.body.emailaddress;
    var password = req.body.password;
    var passwordcon = req.body.passwordcon;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "emailaddress" : emailaddress,
        "password" : password,
        "passwordcon" : passwordcon
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("successful");
        }
    });

});

module.exports = router;
