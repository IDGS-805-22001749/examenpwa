import React, { useState, useEffect } from 'react';
import { useCrud, ACTIONS } from '../contexts/CrudContext';

export const CrudForm = () => {
  const { state, dispatch, saveOrUpdateItem } = useCrud();
  const { currentEditItem, isSubmitting } = state;

  const initialForm = { name: '', email: '', age: '' };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Sincronizar formulario si el item de edición cambia
    setForm(currentEditItem || initialForm);
    setErrors({});
  }, [currentEditItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Función de Validación
  const validate = () => {
    let newErrors = {};
    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El email no es válido.';
    }
    const age = parseInt(form.age);
    if (isNaN(age) || age < 18 || age > 99) {
      newErrors.age = 'La edad es obligatoria y debe ser entre 18 y 99 años.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveOrUpdateItem(form);
      if (!currentEditItem) {
        setForm(initialForm); // Limpiar solo si es una creación
      }
    }
  };

  const handleClearEdit = () => {
    dispatch({ type: ACTIONS.CLEAR_EDIT_ITEM });
    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-light">
        <h5 className="mb-0 text-primary">
            <i className={`bi bi-${currentEditItem ? 'pencil-square' : 'plus-circle'} me-2`}></i>
            {currentEditItem ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Input Nombre */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Ej: John Doe"
              disabled={isSubmitting}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Input Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Ej: correo@dominio.com"
              disabled={isSubmitting}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Input Edad */}
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age || ''}
              onChange={handleChange}
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              placeholder="Ej: 30"
              min="18"
              max="99"
              disabled={isSubmitting}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
          
          {/* Botones */}
          <div className="d-flex justify-content-end">
              {currentEditItem && (
                  <button
                      type="button"
                      onClick={handleClearEdit}
                      className="btn btn-secondary me-2 d-flex align-items-center"
                      disabled={isSubmitting}
                  >
                      <i className="bi bi-x me-1"></i>
                      Cancelar
                  </button>
              )}
              <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center"
                  disabled={isSubmitting}
              >
                  {isSubmitting ? (
                      <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <span>{currentEditItem ? 'Actualizando...' : 'Guardando...'}</span>
                      </>
                  ) : (
                      <>
                        <i className={`bi bi-${currentEditItem ? 'arrow-up-circle' : 'save'} me-1`}></i>
                        <span>{currentEditItem ? 'Actualizar' : 'Guardar'}</span>
                      </>
                  )}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};