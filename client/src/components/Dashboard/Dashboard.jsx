import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem('token'); // Отримуємо токен з localStorage
      if (!token) {
        alert('Токен відсутній');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await axios.get(`http://localhost:5000/api/records`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched records:', response.data.records);
        setRecords(response.data.records);
      } catch (error) {
        console.error('Error response:', error.response); // Логування відповіді з помилкою
      }
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <h2>Мої записи</h2>
      <ol>
        {records.map((record) => (
          <li key={record._id}>
            <h3>{record.text}</h3>
            <audio controls>
              <source
                src={`http://localhost:5000/${record.audioFile}`}
                type="audio/m4a"
              />
              Ваш браузер не підтримує аудіо.
            </audio>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Dashboard;
