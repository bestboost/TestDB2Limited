import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import deepspeech from 'deepspeech';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import voiceRecordRoutes from './routes/voiceRecordRoutes.js';

dotenv.config(); // Завантаження змінних середовища

const app = express();
const PORT = process.env.PORT || 5000;
// Місце для зберігання файлів
const upload = multer({ dest: 'uploads/' });
// Завантажуємо модель DeepSpeech
const modelPath = path.join(
  __dirname,
  'models',
  'deepspeech-0.9.3-models.pbmm'
);
// const scorerPath = './models/deepspeech-0.9.3-models.scorer'; // Якщо ви використовуєте scorer
if (!fs.existsSync(modelPath)) {
  console.error('Model file not found:', modelPath);
  process.exit(1);
}
const model = new deepspeech.Model(modelPath);

// Middleware
app.use(express.json());
app.use(cors());

// Підключення до MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔥 MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Завершити процес у разі помилки
  }
};

connectDB();

// Використовуємо маршрути
app.use('/api/users', userRoutes);
app.use('/api/voiceRecords', voiceRecordRoutes);
// Роут для прийому аудіофайлу
app.post('/api/transcribe', upload.single('audio'), (req, res) => {
  // Перевірка наявності файлу
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  // Базовий маршрут
  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  // Читання аудіофайлу
  const audioPath = path.join(__dirname, req.file.path);
  const buffer = fs.readFileSync(audioPath);

  // Перетворення аудіофайлу в текст
  const audioLength = buffer.length / 2; // Припускаємо 16-бітний аудіофайл
  const audioData = new Int16Array(buffer.buffer);

  try {
    const transcript = model.stt(audioData); // Розпізнавання тексту
    res.json({ text: transcript });
  } catch (error) {
    console.error('Error during transcription', error);
    res.status(500).send({ error: 'Error during transcription' });
  } finally {
    // Видаляємо тимчасовий файл
    fs.unlinkSync(audioPath);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

//тестовий маршрут для перевірки
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working correctly!' });
});
