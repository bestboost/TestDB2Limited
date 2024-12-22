import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Токен передається через заголовок Authorization

  if (!token) {
    return res.status(401).json({ message: 'Токен відсутній' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Невірний токен' });
  }
};

export default authenticateToken;
