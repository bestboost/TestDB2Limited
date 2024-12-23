import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ handleAction }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Будь ласка, оберіть файл');
      return;
    }

    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      alert('Токен відсутній');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append('text', 'example text');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || 'Сталася помилка');
      } else {
        alert('Невідома помилка при завантаженні');
      }
    }
  };

  return (
    <div>
      <h2>Завантаження файлу</h2>
      <input
        type="file"
        onChange={handleFileChange}
        onClick={() => handleAction()}
      />
      <button onClick={handleFileUpload}>Завантажити</button>
    </div>
  );
};

export default FileUpload;
