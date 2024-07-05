import Location from '../models/locationModel.js';

export const addLocation = async (req, res) => {
  const { latitude, longitude, image } = req.body;
  try {
    const newLocation = new Location({ latitude, longitude, image });
    await newLocation.save();
    res.status(201).send(newLocation);
  } catch (error) {
    res.status(400).send("Error at addLocation");
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).send(locations);
  } catch (error) {
    console.error('Error retrieving locations:', error);
    res.status(500).send("Error retrieving locations");
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).send("Location not found");
    }
    res.status(200).send("Location deleted successfully");
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).send("Error deleting location");
  }
};

