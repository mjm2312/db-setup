var mysql = require('mysql');
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
connection.connect((err)=>  {
  if (err) {
    console.log('error connecting to database', err)
  }
  
    let createDb = 'CREATE DATABASE IF NOT EXISTS CowlistRedo';
    connection.query(createDb, (err, res) => {
      if (err) {
        console.log(`error executing ${createDb}, ${err}`);
      }

      let useDb = 'USE CowlistDemo';
      connection.query(useDb, (err, res) => {
        if (err) {
          console.log(`error executing ${useDb}, ${err}`);
        }

        let createTable = `CREATE TABLE IF NOT EXISTS Cows ${Cows}`;
        connection.query(createTable, (err, res) => {
          if (err) {
            console.log(`error executing ${createTable}, ${err}`);
          }

        })
      })
    })
  })
          
module.exports = connection;