const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;


const app = express();
app.use(bodyParser.json());
app.use(cors());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwf82.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const clientCollection = client.db("gymHero").collection("clients");


  app.post('/addRegistration', (req, res) => {
    const registration = req.body;
    clientCollection.insertOne(registration)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })





});




app.get('/', (req, res) => {
  res.send("Hello World")
})




app.listen(port);