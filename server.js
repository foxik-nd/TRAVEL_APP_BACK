import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connexion
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware pour augmenter la limite de taille de la requête
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur!');
});

app.use(cors());
app.use(express.json());

app.use('/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
});
