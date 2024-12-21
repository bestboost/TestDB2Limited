import React, { useState } from 'react';

const Authorization = ({ setIsAuthenticated, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      const { token, name } = response.data;

      // Зберігаємо токен і ім'я користувача в localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);

      setIsAuthenticated(true);
      setUserName(name);
      alert('Успішна авторизація!');
    } catch (error) {
      console.error('Помилка при авторизації:', error);
      alert('Невірні дані для авторизації');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Authorization;
