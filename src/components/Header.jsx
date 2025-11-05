import React from 'react';
import { useAuth } from '../helpers/useAuth';
import { useCount } from '../helpers/useCount';

export const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { count, increment: incrementCount } = useCount('globalCount', 0);

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand h1">
            <i className="bi bi-layout-dashboard me-2"></i> {/* Icono de Bootstrap */}
            Panel de Administración
        </span>

        {/* Contador (uso del Custom Hook) */}
        <div className="d-none d-md-flex align-items-center me-4 text-white">
            <span className="me-2 text-white-50">Contador Global:</span>
            <span className="badge text-bg-secondary me-2">{count}</span>
            <button
                onClick={incrementCount}
                className="btn btn-sm btn-outline-light"
                title="Incrementar Contador"
            >
                +1
            </button>
        </div>

        {/* Botón de Logout */}
        {isLoggedIn && (
            <button
                onClick={logout}
                className="btn btn-danger d-flex align-items-center"
            >
                <i className="bi bi-box-arrow-right me-2"></i> {/* Icono de Bootstrap */}
                Cerrar Sesión
            </button>
        )}
      </div>
    </header>
  );
};