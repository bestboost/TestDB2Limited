import axios from 'axios';

const getUserData = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    alert('You need to log in first!');
    return;
  }

  try {
    const response = await axios.get('http://localhost:5000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`, // додаємо токен в заголовок
      },
    });

    console.log('User data:', response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export default getUserData;
