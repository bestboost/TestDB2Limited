import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Реєстрація користувача
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Перевірка, чи вже існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res
        .status(400)
        .json({ message: 'Користувач з таким е-мейлом вже існує' });
    }

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = new User({ name, email, password: hashedPassword });

    // Збереження користувача в БД
    await newUser.save();

    res.status(201).json({
      message: 'Реєстрація успішна',
      user: newUser,
    });
  } catch (error) {
    console.error(error); // Логування помилок
    res.status(500).json({ message: 'Error creating user', error });
  }
};
// Вхід користувача
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Перевірка чи є користувач з таким email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Перевірка паролю
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Створення токена
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

export default registerUser;
