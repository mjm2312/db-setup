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
  model.remove(params, (error, data) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }
    
    res.send('deleted cow info');
  }) 
})

app.put('/cows', (req, res) => {

  var params = [req.body.name, req.body.description, req.query.id];
  model.update(params, (error, data) => {
    if (error) {
      res.sendStatus(500);
    }

    res.send(`updated cow ${req.query.id}`);
  })
})

app.get('/cows', (req, res) => {  
  model.retrieve((error, data) => {
    if (error) {
      res.sendStatus(500);
    } 

    res.send(data);
  })
})
  
app.post('/cows', (req, res) => {
  var params = [req.body.name, req.body.description]
  model.save(params, (error, data) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }

    res.send({id: data[0].insertId});
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})