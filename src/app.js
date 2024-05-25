const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tourDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get('/tours', (req, res) => {
  //write a code here to get all the tours from tours.json
});

app.post('/tours', (req, res) => {
  const { name, description, duration, price } = req.body;
  //Write a code here for creating new tour from data/tours.json
  //For creating new id use this logic
  // const newId = tourDetails[tourDetails.length - 1].id + 1;
});

app.put('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  const updatedTour = req.body;

  //write a code here for updating a tour
});

app.delete('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  //Write a code here for deleting a tour from data/tours.json
});

module.exports = app;
