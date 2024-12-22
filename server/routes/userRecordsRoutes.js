import express from 'express';
import getUserRecords from '../controllers/userRecordsСontroller.js'; // імпортуємо контролер

const router = express.Router();

router.get('/api/records/:userId', getUserRecords); // новий маршрут для отримання записів

export default router;
