import express from 'express';
import getUserRecords from '../controllers/UserRecordsСontroller.js'; // імпортуємо контролер

const router = express.Router();

router.get('/records', getUserRecords); // новий маршрут для отримання записів

export default router;
