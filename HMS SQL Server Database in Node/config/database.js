const sql = require('mssql')

//'mssql://User:Password@ComputerName/\Instance/DatabaseName'
//Following example:
const config = {
  user: 'HMS',
  password: '2021SE7',
  server: 'localhost', 
  database: 'Hospital Management System Database',
  options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
  
    }
};;

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQLServer...');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};