import React, { createContext, useState, useEffect } from 'react';

interface UserData {
  userLogin: string;
  userToken: string;
  flagAdmin: boolean;
}

interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  signIn(
    userLogin: string,
    userToken: string,
    flagAdmin: boolean,
  ): Promise<void>;
  signOut(): void;
  loading: boolean;
  admin: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [admin, setAdmin] = useState(false);

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

  async function signIn(
    userLogin: string,
    userToken: string,
    flagAdmin: boolean,
  ) {
    setAdmin(flagAdmin);
    const response: UserData = { userLogin, userToken, flagAdmin };
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
      value={{ signed: !!user, user, signIn, signOut, loading, admin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
