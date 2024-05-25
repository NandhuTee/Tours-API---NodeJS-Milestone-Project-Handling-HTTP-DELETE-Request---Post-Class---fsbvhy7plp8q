const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

const toursFilePath = path.join(__dirname, 'data', 'tours.json');

// Helper function to read tours data from file
const readToursFromFile = () => {
  const data = fs.readFileSync(toursFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write tours data to file
const writeToursToFile = (data) => {
  fs.writeFileSync(toursFilePath, JSON.stringify(data, null, 2));
};

// Get all tours
app.get('/tours', (req, res) => {
  const tours = readToursFromFile();
  res.status(200).json(tours);
});

// Create a new tour
app.post('/tours', (req, res) => {
  const { name, description, duration, price } = req.body;
  if (!name || !description || !duration || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const tours = readToursFromFile();
  const newId = tours[tours.length - 1]?.id + 1 || 1;
  const newTour = { id: newId, name, description, duration, price };

  tours.push(newTour);
  writeToursToFile(tours);

  res.status(200).json({ message: 'Tour added successfully' });
});

// Update a tour
app.put('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  const updatedTour = req.body;

  const tours = readToursFromFile();
  const tourIndex = tours.findIndex(tour => tour.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({ message: 'Tour not found' });
  }

  tours[tourIndex] = { ...tours[tourIndex], ...updatedTour };
  writeToursToFile(tours);

  res.status(200).json({ message: 'Tour updated successfully' });
});

// Delete a tour
app.delete('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);

  const tours = readToursFromFile();
  const tourIndex = tours.findIndex(tour => tour.id === tourId);

  if (tourIndex === -1) {
    return res.status(404).json({ message: 'Tour not found' });
  }

  tours.splice(tourIndex, 1);
  writeToursToFile(tours);

  res.status(200).json({ message: 'Tour deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
