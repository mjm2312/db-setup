const { query } = require('../../mysql-promises/db/index.js');
var db = require('./index.js');

module.exports = {
  retrieve: (cb) => {
    let queryString = 'SELECT id, name, description from Cows';
    db.query(queryString, (error, data) => {
      if (error) {
        cb(error);
      }

      cb(null, data);
    })
  },
  
  save: (params, cb) => {
    let queryString = 'INSERT INTO Cows (name, description) VALUES (?, ?)';
     db.query(queryString, params, (error, data) => {
      if (error) {
        cb(error);
      }

      cb(null, data);
     })
  },
  
  update: (params, cb) => {
    //id comes last
    let queryString = 'UPDATE Cows SET name = (?), description = (?) where id = (?)'
    db.query(queryString, params, (error, data) => {
      if (error) {
        cb(error)
      }

      cb(null, data);
    })
  },
  
  remove: (params, cb) => {
    let queryString = 'DELETE FROM Cows where id = (?)'
    db.query(queryString, params, (error, data) => {
      if (error) {
        cb(error)
      }

      cb(null, data);
    })
  }
}