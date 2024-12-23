import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import convertVoiceRoutes from './routes/convertVoiceRoutes.js';
import FileUpload from './models/FileUpload.js';
import recordsRoutes from './routes/UserRecordsRoutes.js';

// Завантаження змінних середовища
dotenv.config();

// Ініціалізація додатку
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false); // Можете встановити true, якщо хочете уникнути попередження

// Підключення до MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔥 MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Логування всіх запитів
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});

// Маршрути
// app.use('/api/users', userRoutes);
app.use('/auth', userRoutes);
app.use('/api/upload', fileUploadRoutes);
app.use('/api', recordsRoutes);
app.use('/api/convertVoiceRecords', convertVoiceRoutes);

console.log('Маршрут /auth підключається');

//спеціальний обробник 404
app.use((req, res) => {
  console.log(`404 Error: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Маршрут не знайдено' });
});

// Базовий маршрут
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Маршрут для отримання тексту голосового запису
app.get('/api/voiceRecords/:recordId/text', async (req, res) => {
  const { recordId } = req.params;

  try {
    // Шукаємо запис у базі даних
    const fileUpload = await FileUpload.findById(recordId);
    if (!fileUpload) {
      return res.status(404).json({ message: 'Запис не знайдено' });
    }

    // Повертаємо текст із бази даних
    res.status(200).json({
      text: fileUpload.text, // Текст з бази даних
    });
  } catch (error) {
    console.error('Помилка під час отримання тексту:', error);
    res.status(500).json({
      message: 'Помилка під час отримання тексту',
      error,
    });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
