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
  .then(() => {
    res.send('deleted cow info');
  })
  .catch((err) => {
    res.sendStatus(500);
  })
})

app.put('/cows', (req, res) => {
  var params = [req.body.name, req.body.description, req.query.id];
  model.update(params)
  .then(() => {
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
    var cows = resp[0].map((c) => {
      return { id: c.id,
        name: c.name,
        description: c.description
      }
    })
    res.send(cows);
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
    let id = {insertId: resp[0].insertId};   
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