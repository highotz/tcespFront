import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

interface UserData {
  userLogin: string;
  userToken: string;
  flagAdmin: boolean;
}

interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  signIn(emailInput: string, passwordInput: string): Promise<void>;
  signOut(): void;
  loading: boolean;
  admin: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = localStorage.getItem('user');
      const storageToken = localStorage.getItem('token');
      const storageAdmin = localStorage.getItem('admin') !== '';

      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
        setIsAdmin(storageAdmin);
      }
    }
    loadStorageData();
  });

  async function signIn(emailInput: string, passwordInput: string) {
    const data = {
      email: emailInput,
      password: passwordInput,
    };
    const response = await api.post('/sessions', data);
    if (response.status === 200) {
      const { token } = response.data;
      const { email, admin } = response.data.user;

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser({ userLogin: email, userToken: token, flagAdmin: admin });
      localStorage.setItem('user', JSON.stringify(email));
      localStorage.setItem('token', JSON.stringify(token));
      if (admin) {
        localStorage.setItem('admin', JSON.stringify(admin));
      } else {
        localStorage.setItem('admin', JSON.stringify(''));
      }
    }
  }
  function signOut() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loading,
        admin: !!isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
