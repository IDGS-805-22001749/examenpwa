import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { CrudPage } from '../pages/CrudPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { useAuth } from '../helpers/useAuth';

// Componente de Ruta Protegida
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        // Redirige al login si no está autenticado
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const AppRouter = () => {
  return (
    <Routes>
        {/* Ruta pública de Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Ruta Protegida (requiere autenticación) */}
        <Route path="/crud" element={
            <ProtectedRoute>
                <CrudPage />
            </ProtectedRoute>
        } />

        {/* Ruta por defecto que redirige al CRUD o Login */}
        <Route path="/" element={<Navigate to="/crud" replace />} />
        
        {/* Ruta 404 (Not Found) */}
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};