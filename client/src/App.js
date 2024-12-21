import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/RegisterPage/Register';
import Authorization from './pages/AuthPage/Authorization';
import RestrictedRoute from './components/RestrictedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/register"
        element={<RestrictedRoute redirectTo="/" component={<Register />} />}
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/" component={<Authorization />} />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
