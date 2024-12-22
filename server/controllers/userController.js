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

    // Генерація токена
    const token = jwt.sign(
      { userId: newUser._id }, // payload
      process.env.JWT_SECRET, // секретний ключ
      { expiresIn: '1h' } // час дії токена
    );

    res.status(201).json({
      message: 'Реєстрація успішна',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Помилка реєстрації:', error); // Логування помилок
    res.status(500).json({ message: 'Помилка створення користувача', error });
  }
};

// Вхід користувача
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Перевірка, чи є користувач з таким email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    // Перевірка паролю
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Невірні облікові дані' });
    }

    // Створення токена
    const token = jwt.sign(
      { userId: user._id }, // payload
      process.env.JWT_SECRET, // секретний ключ
      { expiresIn: '1h' } // час дії токена
    );

    res.status(200).json({
      message: 'Вхід успішний',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Помилка входу:', error);
    res.status(500).json({ message: 'Помилка входу користувача', error });
  }
};

export default registerUser;
