var config = require('./config/config.js');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var ConnectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose').connect(config.dbURL);
var bodyParser = require('body-parser');

var siteName = 'Demo';

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret:config.sessionSecret,
    store: new ConnectMongo({
        mongooseConnection:mongoose.connections[0],
        stringigy:true
    }),
    saveUninitialized:true,
    resave:true
}));

app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Uptil now, this was all setting up the env

//This is nwo your own code
require('./schemas/allSchemas.js')(mongoose);

//Routes
require('./routes/routes.js')(express, app, mongoose);

app.listen(3000, function(){
    console.log('Demo app is working on Port 3000');
});