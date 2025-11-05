import React, { useEffect } from 'react';
import { useCrud, ACTIONS } from '../contexts/CrudContext';

export const CrudTable = () => {
    const { state, dispatch, deleteItem, fetchItems } = useCrud();
    const { data, loading, error, isSubmitting, apiMessage } = state;

    useEffect(() => {
        // Limpiar mensaje de API después de un tiempo
        if (apiMessage) {
            const timer = setTimeout(() => {
                dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: null });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [apiMessage, dispatch]);

    const handleEdit = (item) => {
        dispatch({ type: ACTIONS.SET_EDIT_ITEM, payload: item });
    };

    let content;

    if (loading && !isSubmitting) {
        content = (
            <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando datos...</p>
                </td>
            </tr>
        );
    } else if (error) {
        content = (
            <tr>
                <td colSpan="5" className="text-center py-4 text-danger bg-light">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar los datos: {error}
                    <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchItems}>Reintentar</button>
                </td>
            </tr>
        );
    } else if (data.length === 0) {
        content = (
            <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                    No hay usuarios registrados. ¡Crea uno!
                </td>
            </tr>
        );
    } else {
        // Ordenar por ID para consistencia
        const sortedData = [...data].sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));

        content = sortedData.map((item) => (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                    <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-sm btn-warning me-2"
                        disabled={isSubmitting}
                        title="Editar"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        onClick={() => deleteItem(item.id)}
                        className="btn btn-sm btn-danger"
                        disabled={isSubmitting}
                        title="Eliminar"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    return (
        <div className="card shadow">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-primary">
                    <i className="bi bi-people me-2"></i>
                    Lista de Usuarios
                </h5>
                {isSubmitting && (
                    <span className="text-info d-flex align-items-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Operación en curso...
                    </span>
                )}
            </div>
            <div className="card-body">
                {apiMessage && (
                    <div className={`alert alert-${apiMessage.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                        {apiMessage.text}
                        <button type="button" className="btn-close" onClick={() => dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: null })} aria-label="Close"></button>
                    </div>
                )}
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
