import express from 'express';
import createVoiceRecord from '../controllers/voiceRecordController.js';

const router = express.Router();

// Маршрут для створення запису голосу
router.post('/record', createVoiceRecord);

export default router;
