import FileUpload from '../models/FileUpload.js';
import User from '../models/User.js';

const fileUploadController = async (req, res) => {
  try {
    const { text, userId } = req.body; // отримуємо текст і userId
    const audioFile = req.file; // отримуємо файл

    // Перевірка наявності файлу
    if (!audioFile) {
      return res.status(400).json({ message: 'Audio file is required' });
    }

    // Перевірка наявності користувача
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Створення нового запису файлу
    const newFileUpload = new FileUpload({
      audioFile: audioFile.path, // зберігаємо шлях до файлу
      text,
      userId,
    });

    // Збереження запису в БД
    await newFileUpload.save();

    res.status(201).json({
      message: 'Voice record created successfully',
      FileUpload: newFileUpload,
    });
  } catch (error) {
    console.error('Error creating voice record:', error); // Логування помилки
    res
      .status(500)
      .json({ message: 'Error creating voice record', error: error.message });
  }
};

export default fileUploadController;
