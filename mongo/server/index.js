const express = require('express')
const app = express()
const port = 3000
//const {db} = require('../db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const model = require('../db/model.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./client/dist'))


app.delete('/cows', (req, res) => {

  var param = {_id: req.query.id};
  model.remove(param)
  .then((message)=> {
    res.send('deleted cow info');
  })
  .catch((err) => {
    console.log('error deleting cow', err);
    res.sendStatus(500);
  })  
})

app.put('/cows', (req, res) => {
  var filter = {_id: req.query.id};
  var doc = {name: req.body.name, description: req.body.description}

  model.update(filter, doc)
  .catch((err) => { 
    throw ('bad req')
  })
  .then((update) => {
    console.log(update)
    if (update.n === 0) {
      throw 'no match' 
    }

    res.send(`updated cow ${req.query.id}`); 
  })
  .catch((thrown) => {
    console.log('why thrown?', thrown);
    if (thrown === 'bad req') {
      res.send(400);
    } else if (thrown === 'no match') { 
      res.send(thrown).status(400);
    } else {
      res.sendStatus(500);
    }
  })   
})

app.get('/cows', (req, res) => {
  model.retrieve()
  .then((resp) => {
    let cows = resp.map((c) => {
      return { id: c._id,
        name: c.name,
        description: c.description
      }
    })
    res.send(cows);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})
  
app.post('/cows', (req, res) => {
  var params = {name: req.body.name, description: req.body.description}
  model.save(params)
  .then((resp) => {
    let id = {insertId: resp._id};
    res.send(id);
  })
  .catch((err) => {
    console.log('error saving mongo', err);
    res.sendStatus(500);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)  
})