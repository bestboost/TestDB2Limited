import FileUpload from '../models/FileUpload.js';
import jwt from 'jsonwebtoken';

const getUserRecords = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Отримуємо токен з заголовка

    if (!token) {
      return res.status(403).json({ message: 'Не авторизовано' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Перевіряємо токен

    if (!decoded || !decoded.userId) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const userId = decoded.userId; // Отримуємо userId з токену

    // Отримуємо всі записи користувача
    const records = await FileUpload.find({ userId }).sort({ createdAt: -1 });
    console.log('Fetched records from DB:', records);
    if (!records || records.length === 0) {
      return res
        .status(404)
        .json({ message: 'No records found for this user' });
    }

    res.status(200).json({ records });
  } catch (error) {
    console.error('Error fetching user records:', error);
    res
      .status(500)
      .json({ message: 'Error fetching user records', error: error.message });
  }
};

export default getUserRecords;
