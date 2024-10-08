const db = require('./database');

// bejelentkezés ellenőrzése
function logincheck(req, res, next) {
    let token = req.header('Authorization');
  
    if (!token) {
      res.status(400).send("Lépj má be")
      return;
    }
  
    db.Query(`SELECT * FROM users WHERE ID='${token}'`, (err,results)=>{
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
  
    db.Query(`SELECT role FROM users WHERE ID='${token}'`, (err,results)=>{
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

module.exports = {
    logincheck,
    admincheck
}