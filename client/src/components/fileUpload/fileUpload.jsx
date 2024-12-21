import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ handleAction }) => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('67648102b7df2cd9ebcd41be');

  const handleFileChange = (event) => {
    handleAction();
    const selectedFile = event.target.files[0];
    console.log(file);
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Будь ласка, оберіть файл');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append('text', 'example text');
    formData.append('userId', userId);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response?.status === 409) {
        // Сервер повернув код 409, файл вже існує
        alert('Такий файл вже завантажено!');
      } else {
        console.error(
          'Помилка:',
          error.response?.data?.message || error.message
        );
        if (error.response?.status === 409) {
          alert('Такий файл вже існує!');
        }
      }
    }
  };

  return (
    <div>
      <h2>Завантаження файлу</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Завантажити</button>
    </div>
  );
};

export default FileUpload;
