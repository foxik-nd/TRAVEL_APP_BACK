require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Définir le schéma pour les documents de localisation
const LocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

// Créer un modèle basé sur le schéma
const Location = mongoose.model('Location', LocationSchema);

app.use(cors());
app.use(express.json());

// Route pour récupérer toutes les localisations
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving locations', error });
  }
});

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
});
