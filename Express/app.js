// SETUP //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
var path = require("path");
//const port = process.env.PORT || 4001;
var tempPort;
if (process.argv[2] == '-d')
    tempPort = 80;
else
    tempPort = 4001;
const port = tempPort

const parse = require('./parse.js');
const validate = require('./validate.js')
const query = require('./query.js');
const insert = require('./insert.js');
const template = require('./template.js');

app.use(cors());
app.use(bodyParser.json());

// middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

// Setting up SSL options
const options = {
    //key: fs.readFileSync('path-to-key'),
    //cert: fs.readFileSync('path-to-cert')
};

////// ROUTES //////

//** Testing request response cycle time (for dev only) **//
function cycleTimer(req, res, next) {
    res.locals.cycleTime = []
    res.locals.cycleTime.push(Date.now())
    //console.log('app.js entry - 0 ms')
    next()
}

//** Data Query **//
app.get('/api/audit/observation/:feature/:include', cycleTimer, parse.queryParse, validate.validateAudit, query.featureQuery, query.sendData); 

//** Dropdown Query **/
//app.get('/api/audit/dropdown/:feature/:include', cycleTimer, parse.queryParse, validate.validateAudit, query.featureQuery, query.returnDropdown)

//** Setup Query **//
app.get('/api/setup', cycleTimer, parse.setupParse, query.sendSetup);

// Audit Upload
//app.get('/api/upload/...', parse.uploadParse, insert.insertAudit);

// Template Query
app.get('/api/template/', parse.templateParse, template.makeTemplate); // makeTemplate should be in query.js

// Front Page Stats
app.get('/api/stats/', parse.statsParse, query.statsQuery);

// Easter Egg
app.get('/api/coffee', (req, res) => res.status(418).send(`<center><h3><a href="https://tools.ietf.org/html/rfc2324#section-2.3.2">418 I\'m a teapot</a></h3></center><hr><center><small>&copy TDG ${new Date().getFullYear()}</small></center>`))


// Default to web app paths
app.all('/', function(req, res){
    res.sendFile(path.resolve('../Deployment/Angular/dist/index.html'));
});
app.all('*', function(req, res){
    //console.log('../Deployment/Angular/dist' + req.path);
    console.log('../Deployment/Angular/dist' + req.path);
    res.sendFile(path.resolve('../Deployment/Angular/dist' + req.path));
});
	
app.listen(port, () => console.log(`TDG Backend Node.js server is running on port ${port}`))

////// LISTEN WITH SSL //////
//https.createServer(options, app).listen(port, () => console.log(`TDG Backend Node.js server is running on port ${port}`));
