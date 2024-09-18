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

// Regisztráció
app.post("/reg", (req, res) => {

  // Minden szükséges adat megvan-e?
  if (!req.body.name || !req.body.email || !req.body.passwd || !req.body.confirm ){
    res.status(203).send('Nem adtál meg minden kötelező adatot!');
    return;
  }
/*
  // jelszó min kritériumoknak megfelelés
  if (!req.body.passwd.match(passwdRegExp)){
    res.status(203).send('A jelszó nem elég biztonságos!');
    return;
  }
*/
  // jelszavak ellenőrzése
  if (req.body.passwd != req.body.confirm){
    res.status(203).send('A megadott jelszavak nem egyeznek!');
    return;
  }

  pool.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, results) => {
     
    if (err){
      res.status(500).send('Hiba történt az adatbázis elérése közben!');
      return;
    }
    
    // ha van már ilyen email cím
    if (results.length != 0){
      res.status(203).send('Ez az e-mail cím már regisztrálva van!');
      return;
    }
    
    // új felhasználó felvétele
    pool.query(`INSERT INTO users VALUES('${uuid.v4()}', '${req.body.name}', '${req.body.email}', SHA1('${req.body.passwd}'), 'user', '0', '${req.body.phone}')`, (err, results)=>{
      if (err){
        res.status(500).send('Hiba történt az adatbázis művelet közben!');
        return;
       }
       res.status(202).send('Sikeres regisztráció!');
       return;
    });
    return;
  });

})

// login
app.post('/login', (req, res)=>{

  if (!req.body.email || !req.body.passwd) {
    res.status(203).send("Hiányzó adatok");
    return;
  }

  pool.query(`SELECT ID, name, email, role, status, phone FROM users WHERE email='${req.body.email}' AND password='${CryptoJS.SHA1(req.body.passwd)}'`, (err,results)=>{

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

//Én lekérdezése
app.get('/me/:id', (req,res)=>{
  if (!req.params.id) {
    res.status(203).send("Hiányzó azonosító");
    return;
  }

  pool.query(`SELECT name, email, role, phone FROM users WHERE ID='${req.params.id}'`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }
    if (results.length == 0) {
      res.status(203).send("Hibás azonosító");
      return;
    }

    res.status(202).send(results);
    return;
  })
})

//Én módosítása
app.patch('/users/:id', (req,res)=>{

  if (!req.params.id) {
    res.status(203).send("Hiányzó azonosító");
    return;
  }

  if (!req.body.name || !req.body.email) {
    res.status(203).send("Hiányzó adatok");
    return;
  }
  
  pool.query(`UPDATE users SET name='${req.body.name}', email='${req.body.email}', role='${req.body.role}', phone='${req.body.phone}' WHERE ID='${req.params.id}'`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbáisban");
      return;
    }
    if (results.affectedRows == 0) {
      res.status(203).send("Hibás azonosító");
      return;
    }

    res.status(200).send("Én módosítva");
    return;

  })
})


app.listen(port, () => {
  //console.log(process.env) ;
  console.log(`A masinéria megfigyel itten e: ${port}...`);
});

