/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../components/Button/Button';
import api from '../api';
import logoTcesp from '../assets/images/logo_audit_redondo.png';
import '../styles/login.scss';

export function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  async function handleDirectToHome() {
    history.push('/home');
  }
  const signIn = async (email: string, password: string) => {
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
    } else if (email === 'admin' && password === 'admin') {
      handleDirectToHome();
    } else {
      toast.warn('Email ou senha invalido....', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const response = await api.post('/sessions', { email, password });
    if (response.status === 200) {
      handleDirectToHome();
    } else {
      toast.error('Problema ao conectar na API', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
            <Button onClick={() => signIn(email, password)} type="button">
              Entrar
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
