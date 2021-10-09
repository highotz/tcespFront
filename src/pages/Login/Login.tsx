/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
// import api from '../../api';
import logoTcesp from '../../assets/images/logo_audit_redondo.png';
import AuthContext from '../../contexts/authContext';
import './login.scss';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const history = useHistory();
  const { signIn } = useContext(AuthContext);
  // console.log(signed, user);
  // async function handleDirectToHome() {
  //   history.push('/home');
  // }
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
    } else if (email === 'admin' && password === 'admin') {
      const token = '12312412';
      signIn(email, token);
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
    // const response = await api.post('/sessions', { email, password });
    // if (response.status === 200) {
    //   handleDirectToHome();
    // } else {
    //   toast.error('Problema ao conectar na API', {
    //     position: 'top-center',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
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
            <Button onClick={() => handleSign(email, password)} type="button">
              Entrar
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
