import React from 'react';
import { Navigate } from 'react-router-dom';

const RestrictedRoute = ({ component, redirectTo }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // або будь-яка інша перевірка авторизації

  // Якщо користувач авторизований, перенаправляємо на іншу сторінку
  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Якщо користувач не авторизований, надаємо доступ до сторінки
  return component;
};

export default RestrictedRoute;
