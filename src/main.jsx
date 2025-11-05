import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <-- ESTA ES LA CORRECCIÓN
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css'; // Importa los estilos de App

// Si se usa Bootstrap, es una buena práctica incluir el CSS en la raíz (index.html o aquí)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter es el componente que habilita el enrutamiento */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);