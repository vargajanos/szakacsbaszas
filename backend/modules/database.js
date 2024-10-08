var mysql = require('mysql');
const logger = require('./logger');
const bare = require('cli-color/bare');

var pool  = mysql.createPool({
    connectionLimit : process.env.CONNECTIONLIMIT,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
  });

  pool.getConnection((err)=>{
    if (err) {
      logger.error('Error connection to MySql: '+ err)
    }
    else{
      logger.info('Connected to MySQL database');
    }
  })

  function getQueryInfo(sql){
    const queryType = sql.split(' ')[0].toUpperCase();
    const tableNameMatch = sql.match(/FROM\s+(\w+)|INTO\s+(\w+)|UPDATE\s+(\w+)/i);
    const tableName = tableNameMatch ? (tableNameMatch[1] || tableNameMatch[2] || tableNameMatch[3]) : 'Unkowns table';
    return {queryType, tableName}


  }


  pool.Query = function(sql, callback){
    const {queryType, tableName} = getQueryInfo(sql);

    pool.query(sql, (err, results)=>{
        if (err) {
          logger.error(err);
        }
        else{
          var msg = `[${queryType}] on [${tableName}] -> `;

          if (queryType == 'SELECT') {
            msg += `returned [${results.length}] rows.`;
          }
          else{
            msg += `afftected [${results.affectedRows}] rows.`;
          }


          logger.info(msg);
        }
        callback(err, results);
    });
   

  };
    
  

module.exports = pool;  