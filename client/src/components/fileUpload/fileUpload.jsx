import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('67648102b7df2cd9ebcd41be');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
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
      alert('Файл успішно завантажено!');
      console.log(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні файлу:', error);
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
