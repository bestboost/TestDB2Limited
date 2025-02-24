import express from 'express';
import registerUser from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';

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

export default router;
