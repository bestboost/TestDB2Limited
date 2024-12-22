import FileUpload from '../models/FileUpload.js';

const getUserRecords = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Отримуємо токен з заголовка

    if (!token) {
      return res.status(403).json({ message: 'Не авторизовано' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Перевіряємо токен
    const userId = decoded.userId; // Отримуємо userId з токену

    // Отримуємо всі записи користувача
    const records = await FileUpload.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ records });
  } catch (error) {
    console.error('Error fetching user records:', error);
    res
      .status(500)
      .json({ message: 'Error fetching user records', error: error.message });
  }
};

export default getUserRecords;
