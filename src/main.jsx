import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { PartyProvider } from './party.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PartyProvider>
        <App />
      </PartyProvider>
    </HashRouter>
  </React.StrictMode>
);
