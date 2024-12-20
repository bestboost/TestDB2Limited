import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioToText from '../AudioToText/AudioToText';
import FileUpload from '../fileUpload/fileUpload';

const HomePage = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [records, setRecords] = useState([]); // Список записів
  const [selectedRecord, setSelectedRecord] = useState(null); // Вибраний запис
  const [recognizedText, setRecognizedText] = useState(''); // Розпізнаний текст
  //   const [isLoading, setIsLoading] = useState(false); // Статус завантаження

  // Завантаження записів із сервера

  // useEffect(() => {
  //   const fetchRecords = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:5000/api/voiceRecords/record'
  //       );
  //       setRecords(response.data.records); // Припускаємо, що масив записів у полі "records"
  //     } catch (error) {
  //       console.error('Помилка завантаження записів:', error);
  //     }
  //   };

  //   fetchRecords();
  // }, []);

  const convertAudioToText = async (recordId) => {
    console.log(
      `Request URL: http://localhost:5000/api/voiceRecords/${recordId}/convert`
    );

    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `http://localhost:5000/api/voiceRecords/${recordId}/convert`
      );
      setText(response.data.text);
    } catch (err) {
      setError('Помилка конвертації');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConversion = (recordId) => {
    convertAudioToText(recordId);
  };

  return (
    <div>
      <h1>Головна сторінка</h1>
      <FileUpload />

      {/* Список записів
      <div>
        <h2>Список записів</h2>
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              <button
                onClick={() => {
                  setSelectedRecord(record);
                  handleConversion(record._id);
                }}
              >
                {record.audioFile}
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      <div>
        <AudioToText text={text} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default HomePage;
