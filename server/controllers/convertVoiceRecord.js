import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg'; // Для конвертації аудіо
import { execSync } from 'child_process';

// Контролер для конвертації і розпізнавання аудіо
const convertVoiceRecord = async (req, res) => {
  console.log('Маршрут convertVoiceRecord викликано', req.params.recordId);
  console.log('Record ID:', recordId);
  try {
    const { recordId } = req.params;
    const audioPath = voiceRecord.audioFile; // Шлях до аудіо
    const tempWavPath = path.join(__dirname, '..', 'temp', `${recordId}.wav`); // Шлях до тимчасового WAV файлу
    const outputTextPath = 'output_text.txt'; // Шлях до файлу для тексту
    const modelPath = path.join(__dirname, '..', 'models', 'model.tflite');
    const scorerPath = path.join(__dirname, '..', 'models', 'scorer.scorer');

    // Перевірка на існування файлу
    if (!fs.existsSync(audioPath)) {
      return res
        .status(404)
        .json({ message: 'Аудіофайл не знайдено на сервері' });
    }

    // Конвертація аудіо у WAV
    ffmpeg(audioPath)
      .output(tempWavPath)
      .on('end', async () => {
        console.log('Аудіофайл успішно конвертований у WAV');

        try {
          // Викликаємо DeepSpeech для конвертації
          execSync(
            `deepspeech --model ${modelPath} --scorer ${scorerPath} --audio ${tempWavPath} > ${outputTextPath}`
          );

          // Читання тексту з файлу
          const recognizedText = fs.readFileSync(outputTextPath, 'utf-8');

          // Оновлення тексту у записі
          voiceRecord.text = recognizedText;
          await voiceRecord.save(); // Асинхронне збереження
          console.log('Збережено текст:', recognizedText);

          // Видалення тимчасових файлів
          fs.unlinkSync(audioPath);
          fs.unlinkSync(tempWavPath);

          res.json({
            message: 'Конвертація успішна',
            text: voiceRecord.text,
          });
        } catch (error) {
          console.error('Помилка під час розпізнавання:', error);
          res.status(500).json({ message: 'Помилка при розпізнаванні', error });
        }
      })
      .on('error', (error) => {
        console.error('Помилка під час конвертації:', error);
        res
          .status(500)
          .json({ message: 'Помилка під час конвертації аудіофайлу', error });
      })
      .run();
  } catch (error) {
    console.error('Помилка під час обробки запиту:', error);
    res
      .status(500)
      .json({ message: 'Сталася помилка під час обробки запиту', error });
  }
};

export default convertVoiceRecord;
