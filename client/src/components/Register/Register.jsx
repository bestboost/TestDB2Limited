import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setIsRegistered, setUserName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password,
      });
      const { token } = response.data;

      // Зберігаємо токен і ім'я користувача в localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);

      setIsRegistered(false); // Переходимо на сторінку входу після реєстрації
      setUserName(name);
      alert('Реєстрація успішна!');
    } catch (error) {
      console.error('Помилка при реєстрації:', error);
      alert('Помилка при реєстрації');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
