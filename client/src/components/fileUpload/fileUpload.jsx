import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../utils/UserContext';

const FileUpload = ({ handleAction }) => {
  const [file, setFile] = useState(null);
  // const { userId, error } = useUser();

  // // Логування userId при його оновленні
  // useEffect(() => {
  //   console.log('Updated userId in component:', userId);
  // }, [userId]);

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

// import React, { useState } from 'react';

// const FileUpload = ({ handleAction, userId }) => {
//   const [file, setFile] = useState(null);

//   // Тепер userId не потрібно оголошувати через useState, бо воно передається як пропс.
//   console.log('User ID:', userId); // Використовуємо userId, передане як пропс

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       alert('Будь ласка, виберіть файл для завантаження.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('userId', userId); // Додаємо userId у FormData, якщо потрібно

//       // Логіка для завантаження файлу через API або іншими методами
//       await handleAction(formData);
//       alert('Файл успішно завантажено!');
//     } catch (error) {
//       console.error('Помилка завантаження файлу:', error);
//       alert('Помилка завантаження файлу.');
//     }
//   };

//   return (
//     <div>
//       <h2>Завантаження файлів</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Завантажити</button>
//     </div>
//   );
// };

// export default FileUpload;
