const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('./database');
const { admincheck } =  require('./middlewares')

//kategoria felvetel
router.post('/', admincheck, (req, res)=>{
    //szükséges érték vizsgálat
    if (!req.body.name) {
      res.status(203).send("Hiányzó adatok");
      return;
    }
  
    //felvétel
    db.query(`INSERT INTO categorys VALUES ('${uuid.v4()}', '${req.body.name}')`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }
  
      res.status(200).send("Kategória rögzítve");
      return;
    })
  
  
  
  
  })
  
  //kategoriak lekerese
router.get('/',  (req,res)=>{
  
    db.query(`SELECT * FROM categorys`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatabázisban");
        return;
      }
  
      res.status(200).send(results);
      return;
  
    })
})
  
    // kategória frissítése
router.patch('/:id', admincheck, (req,res)=>{
  
        if (!req.params.id) {
          res.status(203).send("Hiányzó azonosító");
          return;
        }
      
        if (!req.body.name) {
          res.status(203).send("Hiányzó adatok");
          return;
        }
      
        db.query(`UPDATE categorys SET name = "${req.body.name}" WHERE ID = "${req.params.id}"`, (err,results)=>{
          if (err) {
            res.status(500).send("Hiba van az adatabázisban");
            return;
          }
      
          res.status(200).send(results);
          return;
      
        })
})

module.exports = router