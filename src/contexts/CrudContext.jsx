import React, { useReducer, useEffect, useMemo, useContext } from 'react';

// ** IMPORTANTE: Reemplaza esta URL con tu endpoint real de MockAPI **
const MOCK_API_URL = "https://690927b92d902d0651b2d411.mockapi.io/api/users/users"; 

// ====================================================================
// REDUCER (Exportado para que CrudForm y CrudTable puedan usar ACTIONS)
// ====================================================================

export const ACTIONS = { // Exportación nombrada
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_EDIT_ITEM: 'SET_EDIT_ITEM',
  CLEAR_EDIT_ITEM: 'CLEAR_EDIT_ITEM',
  SET_IS_SUBMITTING: 'SET_IS_SUBMITTING',
  SET_API_MESSAGE: 'SET_API_MESSAGE', 
};

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentEditItem: null,
  isSubmitting: false,
  apiMessage: null,
};

function crudReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null, apiMessage: null };
    
    case ACTIONS.SET_IS_SUBMITTING:
        return { ...state, isSubmitting: action.payload };

    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, isSubmitting: false, error: null };

    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload, isSubmitting: false };

    case ACTIONS.SET_EDIT_ITEM:
      return { ...state, currentEditItem: action.payload };

    case ACTIONS.CLEAR_EDIT_ITEM:
      return { ...state, currentEditItem: null };

    case ACTIONS.SET_API_MESSAGE:
        return { ...state, apiMessage: action.payload };

    default:
      return state;
  }
}

// ====================================================================
// CONTEXT Y PROVIDER (Exportados para CrudPage)
// ====================================================================

const CrudContext = React.createContext();

export const CrudProvider = ({ children }) => { // Exportación nombrada
  const [state, dispatch] = useReducer(crudReducer, initialState);

  // Funciones de API... (código no modificado)
  const fetchItems = async () => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      const response = await fetch(MOCK_API_URL);
      if (!response.ok) throw new Error("Fallo al obtener los datos de la API.");
      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error en fetchItems:", error);
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
    }
  };

  const saveOrUpdateItem = async (item) => {
    dispatch({ type: ACTIONS.SET_IS_SUBMITTING, payload: true });
    
    try {
      let response;
      let method;
      const url = item.id ? `${MOCK_API_URL}/${item.id}` : MOCK_API_URL;
      
      if (item.id) {
        method = 'PUT';
      } else {
        method = 'POST';
        item = { ...item, id: undefined }; 
      }

      response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error(`Fallo en la operación ${item.id ? 'Actualizar' : 'Crear'}`);
      
      dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: { type: 'success', text: `Usuario ${item.id ? 'actualizado' : 'creado'} exitosamente.` } });

      await fetchItems();
      dispatch({ type: ACTIONS.CLEAR_EDIT_ITEM });

    } catch (error) {
      console.error("Error en saveOrUpdateItem:", error);
      dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: { type: 'error', text: error.message } });
    } finally {
        dispatch({ type: ACTIONS.SET_IS_SUBMITTING, payload: false });
    }
  };

  const deleteItem = async (id) => {
    dispatch({ type: ACTIONS.SET_IS_SUBMITTING, payload: true });
    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Fallo al eliminar el dato.");

      dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: { type: 'success', text: 'Usuario eliminado exitosamente.' } });

      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: state.data.filter(item => item.id !== id) });

    } catch (error) {
      console.error("Error en deleteItem:", error);
      dispatch({ type: ACTIONS.SET_API_MESSAGE, payload: { type: 'error', text: error.message } });
    } finally {
        dispatch({ type: ACTIONS.SET_IS_SUBMITTING, payload: false });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    fetchItems,
    saveOrUpdateItem,
    deleteItem,
  }), [state]);

  return (
    <CrudContext.Provider value={contextValue}>
      {children}
    </CrudContext.Provider>
  );
};

// Hook para usar el contexto fácilmente (Exportación nombrada)
export const useCrud = () => useContext(CrudContext);