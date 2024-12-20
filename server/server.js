import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path'; // Додано для коректної роботи з __dirname
import userRoutes from './routes/userRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import convertVoiceRoutes from './routes/convertVoiceRoutes.js';
import FileUpload from './models/FileUpload.js';
import fileUploadController from './controllers/fileUploadController.js';

// Завантаження змінних середовища
dotenv.config();

// Ініціалізація додатку
const app = express();
const PORT = process.env.PORT || 5000;

// Створення __dirname для ES-модулів
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Створюємо папку для зберігання файлів
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Налаштовуємо Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Вказуємо шлях до папки
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Маршрути
app.use('/api/users', userRoutes);
app.use('/api/voiceRecords', fileUploadRoutes);
app.use('/api/convertVoiceRecords', convertVoiceRoutes);

//Перевірka помилки
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});

// Базовий маршрут
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Маршрут для завантаження файлів
app.post('/api/upload', upload.single('audioFile'), fileUploadController);

// // Отримання запису
// app.get('/api/voiceRecords/record', async (req, res) => {
//   try {
//     const records = await FileUpload.find(); // Перевірка на наявність записів
//     res
//       .status(200)
//       .json({ message: 'Records fetched successfully', records: records });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

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
