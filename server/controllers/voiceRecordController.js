import mongoose from 'mongoose';
import VoiceRecord from '../models/VoiceRecord.js';
import User from '../models/User.js';

const createVoiceRecord = async (req, res) => {
  try {
    const { audioFile, text, userId } = req.body;

    // Перевірка на існування користувача
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Створення нового запису голосу
    const newVoiceRecord = new VoiceRecord({
      audioFile,
      text,
      userId,
    });

    // Збереження запису в БД
    await newVoiceRecord.save();

    res.status(201).json({
      message: 'Voice record created successfully',
      voiceRecord: newVoiceRecord,
    });
  } catch (error) {
    console.error(error); // Логування помилок
    res.status(500).json({ message: 'Error creating voice record', error });
  }
};

export default createVoiceRecord;
