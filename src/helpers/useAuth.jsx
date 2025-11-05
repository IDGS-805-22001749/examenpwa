import { useState, useEffect } from 'react';

// Define una clave para localStorage
const AUTH_STORAGE_KEY = 'isAuthenticated';

export const useAuth = () => {
  // Inicializa el estado leyendo de localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
      return storedAuth === 'true';
    } catch (e) {
      console.error("Error al leer la autenticación de localStorage:", e);
      return false;
    }
  });

  // Sincroniza el estado con localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error("Error al guardar la autenticación en localStorage:", e);
    }
  }, [isLoggedIn]);

  // Manejador de Login (contraseña: 'admin')
  const login = (password) => {
    if (password === 'admin') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  // Manejador de Logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};