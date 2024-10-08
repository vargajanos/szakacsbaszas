var mysql = require('mysql');
const logger = require("./logger")

var pool  = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME
});

pool.getConnection((err)=>{
  if(err){
    logger.error('Error connecting to MySQL: ' + err)
  }else{
    logger.info("Connected to MySQL.")
  }
})

function getQueryInfo(sql){
  const queryType = sql.split(' ')[0].toUpperCase()
  
  const tablenameMatch = sql.match(/FROM\s+(\w+)|INTO\s+(\w+)|UPDATE\s+(\w+)/i)
  const tableName = tablenameMatch ?  (tablenameMatch[1] || tablenameMatch[2] || tablenameMatch[3]): "Unknown table"
  return {queryType, tableName}
}

pool.Query = function(sql, callback){
  const {queryType, tableName} = getQueryInfo(sql)

  pool.query(sql, (err, results)=>{
    if(err){
      logger.error(err);
    }else{
      var msg = `[${queryType}] on [${tableName}] ->`

      if(queryType == "SELECT"){
        msg += ` returned [${results.length}] rows`
      }else{
        msg += ` affected [${results.affectedRows}] rows`
      }

      logger.info(msg)
    }

    callback(err, results)
  })
}

module.exports = pool