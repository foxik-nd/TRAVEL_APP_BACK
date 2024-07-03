import express from 'express';
import { addLocation, getAllLocations } from '../controllers/locationController.js';

const router = express.Router();

router.post('/', addLocation);
router.get('/', getAllLocations);

export default router;
