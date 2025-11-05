import React, { useState } from 'react';
import { useAuth } from '../helpers/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Intenta loguear y navega si es exitoso
        if (login(password)) {
            navigate('/crud');
        } else {
            setError('Contraseña incorrecta. Pista: "admin"');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
            <div className="card shadow-lg login-card p-4">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
                        <h2 className="card-title mt-3">Acceso al Sistema</h2>
                        <p className="card-subtitle text-muted">Introduce la contraseña para continuar</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control"
                                placeholder="Escribe 'admin'"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};