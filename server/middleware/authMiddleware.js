import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Токен передається через заголовок Authorization

  if (!token) {
    console.log('Токен відсутній');
    return res.status(401).json({ message: 'Токен відсутній' });
  }

  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  try {
    console.log('Перевірка токена:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Розкодований токен:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Невірний токен' });
  }
};

export default authenticateToken;
