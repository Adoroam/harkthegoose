//requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
//start server
var app = express();
var port = 80; 

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
//mongodb/mongoose
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    signup: Date
});
var User = mongoose.model('User', userSchema);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
//routes
app.get('/dXFEjNz6GgyKzpp339eX', function(req, res) {
    User.find(function(err, users) {
        var userlist = [];
        for (x in users) {
            userlist.push(users[x]);
        };
        res.json(userlist);            
    });
});
app.get('/', function(req, res) {
    res.cookie('sent', false);
    res.redirect('/');
});
app.post('/', function(req, res) {
    var clientName = req.body.clientName;
    var clientEmail = req.body.clientEmail;
    var signupDate = Date();
    var newUser = new User({name: clientName, email: clientEmail, signup: signupDate}); 
    if (clientEmail) {
        res.cookie('sent', true);
    }   else {res.clearCookie('sent', false);}
    if (clientName == 'I am the machine') {
        res.redirect('/#/admin');
    }    else {
        User.find(function(err, users) {
            if (err) return console.log(err);
            //loop through users and remove matching email          
            for (x in users) {
                if (users[x].email == newUser.email) {   
                    var user = users[x];             
                    user.remove(function(err, removed) {
                        if (err) return console.log(err);
                        console.log('removed ' + removed);
                    });
                }; 
            };
            //save the new user to the db
            newUser.save(function(err, newUser) {
                if (err) return console.log(err);
                //log the new saved user
                console.log('saved as:' + newUser);
            });
        });
        res.redirect('/');
    };
});

//uncomment below to clear database
/*var clearDB = function() {
    User.find(function(err, users) {
        for (x in users) {
            var user = users[x];
            user.remove(function(err, removed) {
                if (err) return console.log(err);
                console.log('removed: ' + removed);
            });
        };
    });
};
clearDB();*/

app.listen(port, function() {
    console.log("listening on port "+ port);
});
