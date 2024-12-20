import React from 'react';

const AudioToText = ({ text, loading, error }) => {
  return (
    <div>
      <h1>Розпізнавання голосу в текст</h1>
      {loading && <p>Обробка запису...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {text ? (
        <div>
          <h2>Вибраний запис</h2>
          <h2>Розпізнаний текст:</h2>
          <p>{text}</p>
        </div>
      ) : (
        !loading && <p>Текст ще не розпізнано.</p>
      )}
    </div>
  );
};

export default AudioToText;
