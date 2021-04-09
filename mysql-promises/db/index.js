var mysql = require('mysql');
//https://www.quora.com/How-does-a-database-driver-work
var Promise  = require('bluebird');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

var Cows = `(
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  description VARCHAR(200),
  PRIMARY KEY(id)
)
`
const db = Promise.promisifyAll(connection, {multiArgs: true})
db.connectAsync() 
.then(() => console.log('connected to db')) 
.catch((error) => console.log('error connecting to database, ', error))
.then(() => (db.queryAsync('CREATE DATABASE IF NOT EXISTS CowlistDemo'))) 
.then(() => (db.queryAsync('USE CowlistDemo'))) 
.then(() => (db.queryAsync(`CREATE TABLE IF NOT EXISTS Cows ${Cows}`)))
.catch((error) => console.log('error initializing db', error))

module.exports = db;