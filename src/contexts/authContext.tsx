import React, { createContext, useState, useEffect } from 'react';

interface UserData {
  userLogin: string;
  userToken: string;
}

interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  signIn(userLogin: string, userToken: string): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = localStorage.getItem('user');
      const storageToken = localStorage.getItem('token');

      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }
    loadStorageData();
  });

  async function signIn(userLogin: string, userToken: string) {
    const response: UserData = { userLogin, userToken };
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response.userLogin));
    localStorage.setItem('token', JSON.stringify(response.userToken));
  }

  function signOut() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
