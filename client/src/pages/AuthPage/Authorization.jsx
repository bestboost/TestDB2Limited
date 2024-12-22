import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authorization = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      const { token, name } = response.data;

      // Зберігаємо токен і ім'я користувача в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);

      setIsAuthenticated(true);
      alert('Успішна авторизація!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Помилка при авторизації:', error);
      alert('Невірні дані для авторизації');
    }
  };

  return (
    <div>
      <h1>Авторизація</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Authorization;
