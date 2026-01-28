import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// Definimos qué datos compartirá el contexto con toda la app
interface AuthContextType {
  session: string | null;
  userId: string | null;
  isLoading: boolean;
  signIn: (token: string, id: number) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  userId: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carga inicial al abrir la App
    const loadStorageData = async () => {
      try {
        const [token, id] = await Promise.all([
          SecureStore.getItemAsync('token'),
          SecureStore.getItemAsync('user_id'),
        ]);
        
        if (token) setSession(token);
        if (id) setUserId(id);
      } catch (e) {
        console.error("Error cargando datos de sesión", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (token: string, id: number) => {
    const stringId = id.toString();
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('user_id', stringId);
    setSession(token);
    setUserId(stringId);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user_id');
    setSession(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ session, userId, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);