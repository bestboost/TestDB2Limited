import axios from 'axios';

const fetchUserId = async () => {
  console.log('Fetching userId...');
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Токен не знайдено в localStorage');
      setError('Токен відсутній');
      return;
    }
    console.log('Token:', token);
    const response = await axios.get('/auth/getUserId', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserId(response.data.userId);
    console.log('Fetched userId:', response.data.userId);
  } catch (err) {
    console.error('Помилка при отриманні userId:', err);
    setError('Не вдалося отримати userId');
  }
};

export default fetchUserId;
