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

// recept felvétele
app.post('/recipe', logincheck, (req, res)=>{

  // szükséges értékek vizsgálata
  if (!req.body.title || !req.body.userID || !req.body.additions || !req.body.description || !req.body.time || !req.body.calory || req.body.category.length == 0) {
    res.status(203).send("Hiányzó adatok");
    return;
  }
  let recipeID = uuid.v4();

  // felvétel
  pool.query(`INSERT INTO recipes VALUES ('${recipeID}', '${req.body.userID}', '${req.body.title}', '${req.body.additions}', '${req.body.description}', '${req.body.time}', ${req.body.calory})`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }

    //kategoria felvetel
    req.body.category.forEach(elem => {
      pool.query(`INSERT INTO cat_kapcs VALUES ('${uuid.v4()}', '${recipeID}', '${elem.ID}')`, (err,results)=>{
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
app.patch('/recipe', logincheck, (req, res)=>{

  
  pool.query(`UPDATE recipes SET title='${req.body.title}', additions='${req.body.additions}', description='${req.body.description}', time='${req.body.time}', calory=${req.body.calory} WHERE ID='${req.body.ID}'`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }
    

    //kategoria torles
    pool.query(`DELETE FROM cat_kapcs WHERE recipeID='${req.body.ID}'`, (err, results)=>{
      if (err) {
        res.status(500).send("Hiba van az adatbázisban");
        return;
      }

      req.body.category.forEach(elem => {
        pool.query(`INSERT INTO cat_kapcs VALUES ('${uuid.v4()}', '${req.body.ID}', '${elem.ID}')`, (err,results)=>{
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

//users lekérdezése
app.get('/users', admincheck, (req, res) => {

  pool.query(`SELECT ID, name, email, role, status, phone FROM users`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
    res.status(200).send(results);
    return;
  });
});

// user módosítása
app.patch('/usersadm/:id', admincheck, (req, res) => {
  
  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }

  pool.query(`UPDATE users SET role='${req.body.role}', status = ${req.body.status} WHERE ID='${req.params.id}'`, (err, results) => {
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


//recept lekérdezése
app.get('/recipes', (req,res)=>{

  //select
  pool.query(`SELECT * FROM recipes`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }
    
    res.status(202).send(results);
    return;
  })
})

//egy recept milyen kategoria
app.get('/recipes/:id', (req,res)=>{

  pool.query(`SELECT * from categorys WHERE ID IN (SELECT catID from cat_kapcs WHERE recipeID='${req.params.id}')`, (err, results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }

    res.status(202).send(results);
    return;
  })
})

app.delete('/recipe/:id', logincheck, (req,res)=>{

  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }

  pool.query(`DELETE FROM recipes WHERE ID='${req.params.id}'`, (err,results)=>{
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

//Én lekérdezése
app.get('/me/:id', logincheck, (req,res)=>{
  //vizsgálat
  if (!req.params.id) {
    res.status(203).send("Hiányzó azonosító");
    return;
  }
  //select
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
app.patch('/users/:id', logincheck, (req,res)=>{

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


//kategoria felvetel
app.post('/categorys', admincheck, (req, res)=>{
  //szükséges érték vizsgálat
  if (!req.body.name) {
    res.status(203).send("Hiányzó adatok");
    return;
  }

  //felvétel
  pool.query(`INSERT INTO categorys VALUES ('${uuid.v4()}', '${req.body.name}')`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatbázisban");
      return;
    }

    res.status(200).send("Kategória rögzítve");
    return;
  })




})

//kategoria lekeres
app.get('/categorys',  (req,res)=>{

  pool.query(`SELECT * FROM categorys`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatabázisban");
      return;
    }

    res.status(200).send(results);
    return;

  })
})

// legtöbb adatot rögzített felhasználó
app.get("/mostCommonUser", (req,res)=>{
  pool.query(`SELECT name FROM recipes_vt GROUP BY userID ORDER BY COUNT(*) DESC LIMIT 1;`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatabázisban");
      return;
    }

    res.status(200).send(results);
    return;
  })
})

// kategória frissítése
app.patch('/category/:id', admincheck, (req,res)=>{

  if (!req.params.id) {
    res.status(203).send("Hiányzó azonosító");
    return;
  }

  if (!req.body.name) {
    res.status(203).send("Hiányzó adatok");
    return;
  }

  pool.query(`UPDATE categorys SET name = "${req.body.name}" WHERE ID = "${req.params.id}"`, (err,results)=>{
    if (err) {
      res.status(500).send("Hiba van az adatabázisban");
      return;
    }

    res.status(200).send(results);
    return;

  })
})

// MIDDLEWARE functions

// bejelentkezés ellenőrzése
function logincheck(req, res, next) {
  let token = req.header('Authorization');

  if (!token) {
    res.status(400).send("Lépj má be")
    return;
  }

  pool.query(`SELECT * FROM users WHERE ID='${token}'`, (err,results)=>{
    if (results.length == 0) {
      res.status(400).send("Hibás belépés");
      return;
    }

    next();
  })

  return;

}

// jogosultás ellenőrzése
function admincheck(req, res, next) {
  
  let token = req.header('Authorization');

  if (!token) {
    res.status(400).send("Lépj má be")
    return;
  }

  pool.query(`SELECT role FROM users WHERE ID='${token}'`, (err,results)=>{
    if (results.length == 0) {
      res.status(400).send("Hibás authentikáció");
      return;
    }
    if (results[0].role != "admin") {
      res.status(400).send("Nincs jogod bolond");
      return;
    }
    next();
  })

  return;


}


app.listen(port, () => {
  //console.log(process.env) ;
  console.log(`A masinéria megfigyel itten e: ${port}...`);
});

