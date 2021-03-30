const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const port = 5000;
const pass = "Arabian80";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pz7qy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(bodyParser.json());



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookingCollection = client.db("burjAlArab").collection("bookings");

 app.post("/addBooking", (req, res) => {
  const newBooking = req.body;
  bookingCollection.insertOne(newBooking)
  .then(result => {
    res.send(result.insertedCount > 0)
  })
 })

 app.get('/bookings', (req, res) => {
  bookingCollection.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

});


app.listen(process.env.PORT || port);