const express = require('express');
const uuid = require('uuid');
var CryptoJS = require("crypto-js");
const router = express.Router();
const db = require('./database');
const { logincheck, admincheck } =  require('./middlewares')
//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// Regisztráció
router.post("/reg", (req, res) => {

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
  
    db.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, results) => {
       
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
      db.query(`INSERT INTO users VALUES('${uuid.v4()}', '${req.body.name}', '${req.body.email}', SHA1('${req.body.passwd}'), 'user', '0', '${req.body.phone}')`, (err, results)=>{
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
  router.post('/login', (req, res)=>{
  
    if (!req.body.email || !req.body.passwd) {
      res.status(203).send("Hiányzó adatok");
      return;
    }
  
    db.query(`SELECT ID, name, email, role, status, phone FROM users WHERE email='${req.body.email}' AND password='${CryptoJS.SHA1(req.body.passwd)}'`, (err,results)=>{
  
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


//users lekérdezése
router.get('/', admincheck, (req, res) => {

    db.query(`SELECT ID, name, email, role, status, phone FROM users`, (err, results) => {
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
      res.status(200).send(results);
      return;
    });
  });
  
  // user módosítása
  router.patch('/usersadm/:id', admincheck, (req, res) => {
    
    if (!req.params.id) {
      res.status(203).send('Hiányzó azonosító!');
      return;
    }
  
    db.query(`UPDATE users SET role='${req.body.role}', status = ${req.body.status} WHERE ID='${req.params.id}'`, (err, results) => {
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
  
      if (results.affectedRows == 0){
        res.status(203).send('Hibás azonosító!');
        return;
      }
  
      res.status(200).send('Felhasználó adatok módosítva!');
      return;
    });
  });


//Én lekérdezése
router.get('/me/:id', logincheck, (req,res)=>{
    //vizsgálat
    if (!req.params.id) {
      res.status(203).send("Hiányzó azonosító");
      return;
    }
    //select
    db.query(`SELECT name, email, role, phone FROM users WHERE ID='${req.params.id}'`, (err,results)=>{
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
  router.patch('/:id', logincheck, (req,res)=>{
  
    //vizsgálatok
    if (!req.params.id) {
      res.status(203).send("Hiányzó azonosító");
      return;
    }
  
    if (!req.body.name || !req.body.email) {
      res.status(203).send("Hiányzó adatok");
      return;
    }
    //update
    db.query(`UPDATE users SET name='${req.body.name}', email='${req.body.email}', role='${req.body.role}', phone='${req.body.phone}' WHERE ID='${req.params.id}'`, (err,results)=>{
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

module.exports = router