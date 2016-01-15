var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
//schemas
var clientSchema = mongoose.Schema({
    name: String,
    email: String,
    signup: Date
});
var userSchema = mongoose.Schema({
    email: String,
    password: String,
    signup: Date
});
//models
var Client = mongoose.model('Client', clientSchema);
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
};
clearDB();*/