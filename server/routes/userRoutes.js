import express from 'express';
import registerUser from '../controllers/userController.js';

const router = express.Router();

// Маршрут для реєстрації користувача
router.post('/register', registerUser);

export default router;
