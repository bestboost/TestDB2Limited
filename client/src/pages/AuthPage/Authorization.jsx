// import React, { useState } from 'react';
// import Register from '../../components/Register/Register';
// import Authorization from '../../components/Authorization/Authorization';

// const AuthPage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   return (
//     <div>
//       <h1>{isRegistered ? 'Реєстрація' : 'Авторизація'}</h1>
//       {isRegistered ? (
//         <Register
//           setIsAuthenticated={setIsAuthenticated}
//           setIsRegistered={setIsRegistered}
//         />
//       ) : (
//         <Authorization
//           setIsAuthenticated={setIsAuthenticated}
//           setUserName={setUserName}
//           setIsRegistered={setIsRegistered}
//         />
//       )}
//       <button onClick={() => setIsRegistered(!isRegistered)}>
//         {isRegistered
//           ? 'Вже маєте акаунт? Увійдіть'
//           : 'Не маєте акаунту? Зареєструйтесь'}
//       </button>
//     </div>
//   );
// };

// export default AuthPage;
// ?????????????????????

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
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);

      setIsAuthenticated(true);
      alert('Успішна авторизація!');
      navigate('/');
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
