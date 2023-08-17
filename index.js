//IMPORTS
const multer = require('multer');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
var express = require("express");
var config = require("./config");
var database = require("./database");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");
const { Console } = require('console');
var router = express.Router();
var app = express();

const upload = multer({ dest: 'uploads/' });
const html="<h1>HELLOOOOO</h1> <p>allora</p>"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});


/*
 |--------------------------------------------------------------------------
 | ROUTER ROOT
 |--------------------------------------------------------------------------
 */
router.get("/", function (req, res) {
  res.status(200).send({ message: "API " + config.NODE_NAME });
});



module.exports.router = router;