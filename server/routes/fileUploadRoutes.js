import express from 'express';
import multer from 'multer';
import path from 'path';

import fileUploadController from '../controllers/fileUploadController.js';

const router = express.Router();

// Налаштування Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve('uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Маршрут для завантаження аудіофайлу
router.post('/', upload.single('audioFile'), fileUploadController);

export default router;
