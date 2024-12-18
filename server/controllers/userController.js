import User from '../models/User.js';

// Реєстрація користувача
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Перевірка, чи вже існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Створення нового користувача
    const newUser = new User({ name, email, password });

    // Збереження користувача в БД
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error(error); // Логування помилок
    res.status(500).json({ message: 'Error creating user', error });
  }
};
export default registerUser;
