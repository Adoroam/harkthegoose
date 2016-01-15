//requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
//start server
var app = express();
var port = 80; 

app.use(cookieParser());
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
//db stuff
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
//schemas

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    signup: Date,
    admin: Boolean
});
//models
var User = mongoose.model('User', userSchema);

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
    Client.find(function(err, users) {
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

//hash stuff
const hash = function(pass) {
    var hashmasta = require('crypto').createHash('sha1').update(pass).digest('hex');
    return hashmasta;   
};
//routes
app.post('/dXFEjNz6GgyKzpp339eX', function(req, res) {
    User.find(function(err, users) {
        var userlist = [];
        for (x in users) {
            userlist.push(users[x]);
        };
        //fs.writeFile('userlist.json', JSON.stringify(userlist));
        res.json(userlist);            
    });
    //res.redirect('/');
});
app.get('/dXFEjNz6GgyKzpp339eX', function(req, res) {
    res.redirect('/');
});
//client info
app.post('/', function(req, res) {
    /*var clientName = req.body.clientName;
    var clientEmail = req.body.clientEmail;
    var signupDate = Date();
    var newClient = new Client({name: clientName, email: clientEmail, signup: signupDate}); 
    if (clientEmail) {
        res.cookie('sent', true);
        Client.find(function(err, users) {
            if (err) return console.log(err);
            //loop through users and remove matching email          
            for (x in users) {
                if (users[x].email == newClient.email) {   
                    var client = users[x];             
                    client.remove(function(err, removed) {
                        if (err) return console.log(err);
                        console.log('removed ' + removed);
                    });
                }; 
            };
            //save the new user to the db
            newClient.save(function(err, newClient) {
                if (err) return console.log(err);
                //log the new saved user
                console.log('saved as:' + newClient);
            });
        });//end client find function
        res.redirect('/');
    }   else {res.clearCookie('sent');};*/
});
//login
app.get('/login', function(req, res) {
    res.redirect('/#/login');
});
app.post('/login', function(req, res) {
    //client info
    var loginEmail = req.body.loginEmail;
    var loginPass = req.body.loginPass;
    loginPass = hash(loginPass);
    if (loginEmail) {
        User.find(function(err, users) {
            if (err) return console.log(err);
            //loop through users and remove matching email  
            var aUser = false;        
            for (x in users) {
                if (users[x].email == loginEmail) {   
                    aUser = users[x];    
                }; 
            };
            if (aUser) {
                if (aUser.password == loginPass) {
                    res.cookie('user', aUser.id);
                    res.redirect('/');              
                }   else {
                    res.cookie('error', 'password error');
                    res.redirect('/login');
                }
            }   else {
                res.cookie('error', 'email error');
                res.redirect('/login');
            }
            
        });//end client find function
    }   else {
        res.cookie('error', 'other error');
        res.redirect('/login');
    };
});
//signup
app.post('/signup', function(req, res) {
    //client info
    if (req.body.loginEmail) {
        var loginName = req.body.loginName;//post for name
        var loginEmail = req.body.loginEmail;//post for email
        var loginPass = req.body.loginPass;//post for password
        loginPass = hash(loginPass);//hash the password
    }   else if (req.body.clientEmail) {
        var loginName = req.body.clientName;//post for prelim name
        var loginEmail = req.body.clientEmail;//post for prelim email
        var loginPass = hash('');
    }
    var signupDate = Date();//set date
    //define new user
    var newUser = new User({name: loginName, email: loginEmail, password: loginPass, signup: signupDate, admin: false}); 
    //if an email is provided check the users for matching email address
    if (loginEmail) {
        User.find(function(err, users) {
            if (err) return console.log(err); 
            var exists = false;
            for (x in users) {
                //if any user's email matches the new email set exists
                if (users[x].email == newUser.email) {   
                    exists = true;
                }; 
            };
            //if user doesn't exist save the new user
            if (!exists) {
                newUser.save(function(err, newUser) {
                    if (err) return console.log(err);
                    //log the new saved user
                    console.log('saved as:' + newUser);
                    res.cookie('user', newUser.id);
                    res.redirect('/');
                });                
            }   else {
                //if user exists redirect to login and post error cookie
                res.cookie('error', 'user exists');
                res.redirect('/login');
            }
        });
    }   else {
        //if no email provided redirect to login and give error cookie
        res.cookie('error', 'no email');
        res.redirect('/login');}
});
//admin
app.get('/admin', function(req, res) {
    res.redirect('/#/admin');
});
app.post('/admin', function(req, res) {
    var userlistDel = req.body.userlistDel;
    User.find(function(err, users) {
        if (err) return console.log(err);
        for (x in users) {
            if (users[x].id == userlistDel) {
                var userDel = users[x];
                userDel.remove(function(err, removed) {
                    if (err) return console.log(err);
                    console.log('removed ' + removed);
                });
            }
        };
    });
    res.redirect('/admin');
});
//manually add user
/*app.get('/manualuser', function(req, res) {
    var hashpass = hash("");
    var addUser = new User({
        name: "Ellen Garmon",
        email: "Ellen@harkthegoose.com",
        password: hashpass,
        signup: Date(),
        admin: true
    });
    addUser.save(function(err, newUser) {
                    if (err) return console.log(err);
                    //log the new saved user
                    console.log('saved as:' + newUser);
                    res.redirect('/');
    });                
});*/
//LISTEN
app.listen(port, function() {
    console.log("listening on port "+ port);
});
