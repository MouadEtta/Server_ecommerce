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

const privateKey = pems.private;
const certificate = pems.cert;

fs.writeFileSync('nodeamg23.key', privateKey);
fs.writeFileSync('nodeamgcertificate23.crt', certificate);

////////////////////SERVERS/////////////////////

// HTTPS

// CERTIFICATIONS TO USE AN HTTPS

 // Assumi che il file myCA.crt sia stato generato precedentemente.

var credentials = { key: privateKey, cert: certificate };
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
