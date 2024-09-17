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



app.post('/login', (req, res)=>{

  if (!req.body.email || !req.body.passwd) {
    res.status(203).send("Hiányzó adatok");
    return;
  }

  pool.query(`SELECT ID, name, email, role, status, phone FROM users WHERE email='${req.body.email}' AND password='${req.body.passwd}'`, (err,results)=>{

    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }
    if (results.length == 0) {
      res.status(203).send("Rossz belépési adatok");
      return;
    }

    res.status(202).send(results);
    return;

  });


})





app.listen(port, () => {
  //console.log(process.env) ;
  console.log(`A masinéria megfigyel itten e: ${port}...`);
});