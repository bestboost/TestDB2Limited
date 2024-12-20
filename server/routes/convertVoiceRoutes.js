import express from 'express';
import multer from 'multer';
import convertVoiceRecord from '../controllers/fileUploadController.js';
import getTextForRecord from '../controllers/getTextController.js';

// Налаштування multer для прийому файлів
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Роут для транскрипції аудіо (приймає аудіофайл)
router.post('/transcribe', upload.single('audio'), convertVoiceRecord);

// Роут для конвертації запису за його ID
router.post('/:recordId/convert', convertVoiceRecord);

// Роут для отримання тексту за його ID
router.get('/:recordId/text', getTextForRecord);

export default router;
