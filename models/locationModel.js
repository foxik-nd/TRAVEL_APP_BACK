import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  imagePath: String,
  timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
