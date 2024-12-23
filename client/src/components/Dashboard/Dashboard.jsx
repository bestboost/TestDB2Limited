import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useUser } from '../../utils/UserContext';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  // const { userId, error } = useUser();

  useEffect(() => {
    // if (userId) {
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
        console.log('Fetched records:', response.data);

        setRecords(response.data.records);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
      // };

      fetchRecords();
    };
  }, []);

  return (
    <div>
      <h2>Мої записи</h2>
      <ul>
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
      </ul>
    </div>
  );
};

export default Dashboard;
