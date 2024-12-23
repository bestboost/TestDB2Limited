import FileUpload from '../models/FileUpload.js';
import User from '../models/User.js';

const fileUploadController = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { text } = req.body; // Текст з тіла запиту
    const audioFile = req.file; // Файл з multer

    if (!audioFile) {
      return res.status(400).json({ message: 'File is missing' });
    }

    if (!text) {
      return res.status(400).json({ message: 'Text is missing' });
    }

    console.log('Received text:', text);
    console.log('Received audio file:', audioFile);

    // //Перевірка наявності файла
    // const existingFile = await FileUpload.findOne({
    //   userId,
    //   audioFile: audioFile.fieldname,
    // });

    // if (existingFile) {
    //   return res.status(409).json({ message: 'Файл вже існує' });
    // }

    // Створення нового запису файлу
    const newFileUpload = new FileUpload({
      audioFile: audioFile.filename,
      text,
      userId,
    });

    // Збереження запису в БД
    await newFileUpload.save();

    res.status(201).json({
      message: 'Ваш файл завантажено',
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
