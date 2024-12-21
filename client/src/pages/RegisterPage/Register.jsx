import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

      setIsRegistered(true); // Переходимо на сторінку входу після реєстрації
      setName(name);
      setError('');
      alert('Реєстрація успішна!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response?.data?.message || 'Сталася помилка.'); // Встановлюємо повідомлення про помилку
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError('Сталася помилка. Спробуйте ще раз'); // Загальна помилка
      }
    }
  };

  return (
    <div>
      <h1>Реєстрація</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Логін"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Зареєструватися</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
