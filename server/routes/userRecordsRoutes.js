import express from 'express';
import getUserRecords from '../controllers/UserRecordsСontroller.js'; // імпортуємо контролер
import getUserId from '../controllers/authController.js';

const router = express.Router();

router.get('/records', getUserId, getUserRecords); // новий маршрут для отримання записів

export default router;
