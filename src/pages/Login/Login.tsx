/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import logoTcesp from '../../assets/images/logo_audit_redondo.png';
import AuthContext from '../../contexts/authContext';
import './login.scss';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleSign = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('Preencha o seu email e senha!!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      signIn(email, password);
    }
  };

  return (
    <div id="page-login">
      <aside>
        <strong>Estamos aqui para faciltar sua auditoria!</strong>

        <p>
          Temos o objetivo de centralizar os problemas apontados nos sites de
          cada município!
        </p>
      </aside>

      <main>
        <img src={logoTcesp} alt="TCESP" />
        <div>
          {/* <h1>Login</h1> */}
          <form>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Digite seu email"
            />
            <input
              id="senha"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
            />
            <button onClick={() => handleSign(email, password)} type="button">
              Entrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
