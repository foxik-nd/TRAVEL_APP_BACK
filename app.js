require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;


mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const LocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', LocationSchema);

app.use(cors());
app.use(express.json());

app.post('/locations', async (req, res) => {
  const { latitude, longitude } = req.body;
  const newLocation = new Location({ latitude, longitude });
  await newLocation.save();
  res.status(201).send(newLocation);
});

// app.get('/locations', async (req, res) => {
//   const locations = await Location.find();
//   res.status(200).send(locations);
// });

app.get('/', (req, res) => {
    res.send('Welcome to the Geo Tracker API');
  });

  app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

