import React from 'react'; // <-- ¡ESTA ES LA LÍNEA QUE FALTABA!
import { useAuth } from './helpers/useAuth';
import { useCount } from './helpers/useCount';
// V--- LA CORRECCIÓN ESTÁ AQUÍ ---V
import { AppRouter } from './routes/AppRouter'; // Usar { AppRouter } en lugar de AppRouter

// Context provider for Auth and Count
// Esto fallaba porque 'React' no estaba definido
export const AuthContext = React.createContext(null);

// Hook helper para consumir el contexto fácilmente
// Esto también fallaba
export const useAuthContext = () => React.useContext(AuthContext);

function App() {
  const auth = useAuth();
  const count = useCount('globalCount', 0);

  return (
    <AuthContext.Provider value={{ auth, count }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;