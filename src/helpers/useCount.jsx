import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar un contador con persistencia en localStorage.
 * @param {string} key - Clave para localStorage.
 * @param {number} initialValue - Valor inicial.
 */
export const useCount = (key, initialValue) => {
  // Inicialización desde localStorage
  const [count, setCount] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error leyendo localStorage para useCount:", error);
      return initialValue;
    }
  });

  // Efecto para sincronizar con localStorage en cada cambio
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(count));
  }, [key, count]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};