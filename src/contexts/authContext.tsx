/* eslint-disable camelcase */
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
      const storageAdmin = localStorage.getItem('admin') !== '"false"';

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
    try {
      const response = await api.post('/sessions', data);
      if (response.status === 200) {
        const { token } = response.data;
        const { email, admin, id_tecesp } = response.data.user;
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        api.defaults.headers.common.userId = id_tecesp;

        setUser({ userLogin: email, userToken: token, flagAdmin: admin });

        localStorage.setItem('user', JSON.stringify(email));
        localStorage.setItem('token', JSON.stringify(token));

        if (admin) {
          localStorage.setItem('admin', JSON.stringify(admin));
        } else {
          localStorage.setItem('admin', JSON.stringify('false'));
        }
      }
    } catch (error) {
      toast.warning('Email ou senha incorretos', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
