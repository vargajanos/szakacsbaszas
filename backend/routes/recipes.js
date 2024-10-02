const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('./database');
const { logincheck } =  require('./middlewares')


// recept felvétele
router.post('/', logincheck, (req, res)=>{

    // szükséges értékek vizsgálata
    if (!req.body.title || !req.body.userID || !req.body.additions || !req.body.description || !req.body.time || !req.body.calory || req.body.category.length == 0) {
      res.status(203).send("Hiányzó adatok");
      return;
    }
    let recipeID = uuid.v4();
  
    // felvétel
    db.query(`INSERT INTO recipes VALUES ('${recipeID}', '${req.body.userID}', '${req.body.title}', '${req.body.additions}', '${req.body.description}', '${req.body.time}', ${req.body.calory})`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }
  
      //kategoria felvetel
      req.body.category.forEach(elem => {
        db.query(`INSERT INTO cat_kapcs VALUES ('${uuid.v4()}', '${recipeID}', '${elem.ID}')`, (err,results)=>{
          if (err) {
            res.status(500).send("Hiba van az adatbázisban");
            return;
          }  
        });
      })
  
  
      res.status(200).send("A recept rögzítve lett");
      return;
    });
    
  
  })
  
  //recept modositasa
  router.patch('/', logincheck, (req, res)=>{
  
    
    db.query(`UPDATE recipes SET title='${req.body.title}', additions='${req.body.additions}', description='${req.body.description}', time='${req.body.time}', calory=${req.body.calory} WHERE ID='${req.body.ID}'`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }
      
  
      //kategoria torles
      db.query(`DELETE FROM cat_kapcs WHERE recipeID='${req.body.ID}'`, (err, results)=>{
        if (err) {
          res.status(500).send("Hiba van az adatbázisban");
          return;
        }
  
        req.body.category.forEach(elem => {
          db.query(`INSERT INTO cat_kapcs VALUES ('${uuid.v4()}', '${req.body.ID}', '${elem.ID}')`, (err,results)=>{
            if (err) {
              res.status(500).send("Hiba van az adatbázisban");
              return;
            }
          });
        })
        res.status(200).send("Sikeres módosítás");
        return;
      })
      //kategoria felvetel
    })
  
  })
  
  //recept lekérdezése
  router.get('/', (req,res)=>{
  
    //select
    db.query(`SELECT * FROM recipes`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }
      
      res.status(202).send(results);
      return;
    })
  })
  
  //egy recept milyen kategoria
  router.get('/:id', (req,res)=>{
  
    db.query(`SELECT * from categorys WHERE ID IN (SELECT catID from cat_kapcs WHERE recipeID='${req.params.id}')`, (err, results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }
  
      res.status(202).send(results);
      return;
    })
  })
  
  router.delete('/:id', logincheck, (req,res)=>{
  
    if (!req.params.id) {
      res.status(203).send('Hiányzó azonosító!');
      return;
    }
  
    db.query(`DELETE FROM recipes WHERE ID='${req.params.id}'`, (err,results)=>{
      if (err){
        res.status(500).send('Hiba történt az adatbázis művelet közben!');
        return;
      }
  
      if (results.affectedRows == 0){
        res.status(203).send('Nincs ilyen adat!');
        return;
      }
  
      res.status(200).send('Sikeres recept törlés');
      return;
  
  
    })
  
  
  })
  
  // legtöbb adatot rögzített felhasználó
  router.get("/mostCommonUser", (req,res)=>{
    db.query(`SELECT name FROM recipes_vt GROUP BY userID ORDER BY COUNT(*) DESC LIMIT 1;`, (err,results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatabázisban");
        return;
      }
  
      res.status(200).send(results);
      return;
    })
  })

module.exports = router