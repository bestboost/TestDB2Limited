import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
// import AuthPage from './components/AuthPage'; // Якщо є авторизація

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/auth" element={<AuthPage />} /> */}
    </Routes>
  );
};

export default App;
