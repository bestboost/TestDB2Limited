import express from 'express';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/authMiddleware.js';
import registerUser from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();

// Маршрут для реєстрації користувача
router.post('/register', registerUser);

// Маршрут для входу
router.post('/login', loginUser);

router.get('/user', authenticateToken, (req, res) => {
  // Якщо токен валідний, користувач має доступ
  res
    .status(200)
    .json({ message: 'Welcome to protected route!', user: req.user });
});

// Маршрут для отримання userId після аутентифікації
router.get('/getUserId', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Отримуємо токен з заголовка
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: 'Не авторизовано' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Витягуємо userId з токену

    req.userId = decoded.userId;
    res.json({ userId });

    console.log('t:', token);
    console.log('Decoded userId:', req.userId);
    console.log('Request body:', req.body);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Невірний токен або помилка сервера', error });
  }
});

export default router;
