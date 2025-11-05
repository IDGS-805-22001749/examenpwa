import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center text-center bg-white" style={{ minHeight: '100vh' }}>
            <div>
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="fs-3"> <span className="text-danger">¡Vaya!</span> Página no encontrada.</p>
                <p className="lead">
                    Lo sentimos, la página que estás buscando no existe.
                </p>
                <Link to="/crud" className="btn btn-primary mt-3">
                    <i className="bi bi-house-door-fill me-2"></i>
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};