import Location from '../models/locationModel.js';

export const addLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();
    res.status(201).send(newLocation);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error at addLocation");
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).send(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving locations");
  }
};
