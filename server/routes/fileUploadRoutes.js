import express from 'express';
import fileUploadController from '../controllers/fileUploadController.js';

const router = express.Router();

// Маршрут для завантаження аудіофайлу
router.post('/record', fileUploadController);

export default router;
