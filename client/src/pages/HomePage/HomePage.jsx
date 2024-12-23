import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AudioToText from '../../components/AudioToText/AudioToText';
import FileUpload from '../../components/fileUpload/fileUpload';
import Dashboard from '../../components/Dashboard/Dashboard';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(
    !!localStorage.getItem('token')
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [records, setRecords] = useState([]); // Список записів
  // const [selectedRecord, setSelectedRecord] = useState(null); // Вибраний запис
  // const [recognizedText, setRecognizedText] = useState(''); // Розпізнаний текст
  //   const [isLoading, setIsLoading] = useState(false); // Статус завантаження

  // Перевірка на наявність токену в localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const handleAction = () => {
    if (!isAuthorized) {
      alert('Ви не авторизовані. Будь ласка, увійдіть або зареєструйтесь.');
      navigate('/auth');
    }
  };

  // Функція виходу
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    navigate('/');
  };

  // const convertAudioToText = async (recordId) => {
  //   console.log(
  //     `Request URL: http://localhost:5000/api/voiceRecords/${recordId}/convert`
  //   );

  //   try {
  //     setLoading(true);
  //     setError('');
  //     const response = await axios.get(
  //       `http://localhost:5000/api/voiceRecords/${recordId}/convert`
  //     );
  //     setText(response.data.text);
  //   } catch (err) {
  //     setError('Помилка конвертації');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleConversion = (recordId) => {
  //   convertAudioToText(recordId);
  // };

  return (
    <>
      <div>
        <h1>Welcome to the HomePage</h1>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button>Авторизація</button>
            </Link>
            <Link to="/register">
              <button>Реєстрація</button>
            </Link>
          </>
        ) : (
          <div>
            <p>Welcome, {userName}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <FileUpload handleAction={handleAction} />
      <Dashboard />
      <AudioToText text={text} loading={loading} error={error} />
    </>
  );
};

export default HomePage;
