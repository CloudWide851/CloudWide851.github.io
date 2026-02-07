import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/config'; // Initialize i18n before rendering
import App from './App';
import './styles/index.css';
import './styles/markdown.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
