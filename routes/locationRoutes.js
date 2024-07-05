import express from 'express';
import { addLocation, getAllLocations } from '../controllers/locationController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
}
});
  
const upload = multer({ storage });

router.post('/', upload.single('image'), addLocation);
router.get('/', getAllLocations);

export default router;
