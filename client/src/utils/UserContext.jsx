import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Токен відсутній');
        return;
      }

      console.log('Token:', token);

      const response = await axios.get('http://localhost:5000/auth/getUserId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Перевіряємо статус відповіді, якщо не 2xx
      if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        setError('Помилка при отриманні userId');
        return;
      }

      console.log('Response:', response);
      if (response.data && response.data.userId) {
        setUserId(response.data.userId);
        console.log('Fetched userId:', response.data.userId);
      } else {
        setError('Не вдалося отримати userId');
      }
    } catch (err) {
      console.error('Помилка при отриманні userId:', err);
      setError('Не вдалося отримати userId');
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  console.log('Rendering UserProvider', { userId, error });

  return (
    <UserContext.Provider value={{ userId, error }}>
      {console.log('Rendering UserProvider', { userId, error })}
      {children}
    </UserContext.Provider>
  );
};
