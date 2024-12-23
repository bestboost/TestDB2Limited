import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import registerUser from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';
import getUserId from '../controllers/authController.js';

const router = express.Router();

// Маршрут для реєстрації користувача
router.post('/register', registerUser);

// Маршрут для входу
router.post('/login', loginUser);

// router.get('/user', authenticateToken, (req, res) => {
//   // Якщо токен валідний, користувач має доступ
//   res
//     .status(200)
//     .json({ message: 'Welcome to protected route!', user: req.user });
// });

// Маршрут для отримання userId після аутентифікації
router.get('/getUserId', (req, res) => {
  res.status(200).json({ message: 'Route works!' });
});
console.log('Маршрут /getUserId підключений'); // Додано лог
export default router;
