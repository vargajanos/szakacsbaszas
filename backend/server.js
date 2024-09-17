require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const uuid = require('uuid');
var cors = require('cors');
var CryptoJS = require("crypto-js");

const app = express();
const port = process.env.PORT;
//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var pool  = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME
});

app.listen(port, () => {
    //console.log(process.env) ;
    console.log(`A masinéria megfigyel itten e: ${port}...`);
  });