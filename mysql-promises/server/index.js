const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');

const model = require('../db/model.js')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./client/dist'))


app.delete('/cows', (req, res) => {
  var params = [req.query.id];
  model.remove(params)
  .then((message)=> {
    console.log('deleted cow w message', message)
    res.send('deleted cow info');
  })
  .catch((err) => {
    console.log('error deleting cow', err);
    res.sendStatus(500);
  })
})

app.put('/cows', (req, res) => {
  var params = [req.body.name, req.body.description, req.query.id];
  model.update(params)
  .then((update) => {
    res.send(`updated cow ${req.query.id}`) 
  })
  .catch((err) => {
    console.log('error during update', err);
    res.sendStatus(500);
  })
})

app.get('/cows', (req, res) => {  
  model.retrieve()
  .then((resp) => {
    var cows = resp.map((c) => {
      return { id: c._id,
        name: c.name,
        description: c.description
      }
    })
    res.json(cows);
  })
  .catch((err) => {
    console.log('retrieve err ', err);
    res.sendStatus(500);
  })
})
  
app.post('/cows', (req, res) => {
  var params = [req.body.name, req.body.description]
  model.save(params)
  .then((resp) => {
    let id = {insertId: resp.insertId};
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