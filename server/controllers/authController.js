import jwt from 'jsonwebtoken';

const getUserId = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Відсутній або некоректний заголовок авторизації' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Токен не надано' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(403).json({ message: 'Недійсний токен' });
    }

    // Зберігаємо userId у запиті для наступних middleware
    req.userId = decoded.userId;
    console.log('Decoded userId:', decoded.userId);

    // Передаємо управління далі
    next();
  } catch (error) {
    console.error('Помилка перевірки токена:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен прострочений' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Недійсний токен' });
    }

    return res
      .status(500)
      .json({ message: 'Внутрішня помилка сервера', error: error.message });
  }
};

export default getUserId;
