import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './app/page'; // Directly importing from app/
// import '../styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
