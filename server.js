const selfsigned = require('selfsigned');
const fs = require('fs');
const http = require('http');
const express = require('express');
const https = require('https');
const path = require('path');

const app = express();

// Genera il certificato autofirmato
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });



const options = {
  key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
  cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
  }
////////////////////SERVERS/////////////////////

// HTTPS

// CERTIFICATIONS TO USE AN HTTPS

 // Assumi che il file myCA.crt sia stato generato precedentemente.

var credentials = { key: options.key, cert: options.cert};
var port = '16370';
var portSSL = '16370';
// CREAZIONE DEL SERVER HTTPS
var httpsServer = https.createServer(credentials, app).listen(portSSL, function() {
  console.log("SSL server running at https://localhost:" + portSSL + "/");
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false, limit: '450mb' }));
app.use(bodyParser.json({ limit: '450mb' }));

///////////////////////////// ROUTING //////////////////////////////
// API ROUTING
var router = express.Router();
var index = require('./index').router;

// API REST
router.get('/', function(req, res) {
  res.json({ message: 'API in http://localhost:' + port + '/api' });
});

// ROUTER AND API FOR THE APP 
app.use('/', router);
app.use('/api', index);
