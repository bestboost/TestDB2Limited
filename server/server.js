import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import voiceRecordRoutes from './routes/voiceRecordRoutes.js';

dotenv.config(); // Завантаження змінних середовища

const app = express();
const PORT = process.env.PORT || 5000;

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

// Базовий маршрут
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

//тестовий маршрут для перевірки
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working correctly!' });
});
