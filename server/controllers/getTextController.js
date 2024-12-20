import VoiceRecord from '../models/FileUpload.js';

const getTextForRecord = async (req, res) => {
  try {
    const { recordId } = req.params;

    // Знайти запис у базі даних
    const voiceRecord = await VoiceRecord.findById(recordId);
    if (!voiceRecord) {
      return res.status(404).json({ message: 'Запис не знайдено' });
    }

    // Повертаємо текст
    res.json({ text: voiceRecord.text });
  } catch (error) {
    console.error('Помилка при отриманні тексту:', error);
    res.status(500).json({ message: 'Помилка при отриманні тексту', error });
  }
};

export default getTextForRecord;
