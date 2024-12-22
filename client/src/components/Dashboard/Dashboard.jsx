import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../utils/UserContext';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const { userId, error } = useUser();

  useEffect(() => {
    if (userId) {
      const fetchRecords = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/records/${userId}`
          );
          setRecords(response.data.records);
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      };

      fetchRecords();
    }
  }, [userId]);

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
