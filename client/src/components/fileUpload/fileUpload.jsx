import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../utils/UserContext';

const FileUpload = ({ handleAction }) => {
  const [file, setFile] = useState(null);
  const { userId, error } = useUser();
  useEffect(() => {
    console.log('Updated userId in component:', userId);
  }, [userId]);
  console.log('App component:', { userId, error });
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Будь ласка, оберіть файл');
      return;
    }

    const token = localStorage.getItem('token'); // Отримуємо токен з localStorage
    if (!token) {
      alert('Токен відсутній');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append('text', 'example text');
    formData.append('userId', userId);
    console.log('userId:', userId);
    console.log('Token:', token);

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
        // if (error.response.status === 409) {
        //   alert('Такий файл вже завантажено!');
        // } else {
        alert(error.response.data?.message || 'Сталася помилка');
        // }
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
