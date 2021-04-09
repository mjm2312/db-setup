var db = require('./index.js');
module.exports = {
  retrieve: () => {
    return db.queryAsync('SELECT id, name, description from Cows')
  },
  
  save: (params) => {
    return db.queryAsync('INSERT INTO Cows (name, description) VALUES (?, ?)', params)
  },
  
  update: (params) => {
    return db.queryAsync('UPDATE Cows SET name = (?), description = (?) where id = (?)', params)
  },
  
  remove: (params) => {
    return db.queryAsync('DELETE FROM Cows where id = (?)', params)
  }
}

