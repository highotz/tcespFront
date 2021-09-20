/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

import logoTcesp from '../assets/images/logotipo_tcesp.svg';

import '../styles/login.scss';

export function Login() {
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
        <div className="main-content">
          <img src={logoTcesp} alt="TCESP" />
          <strong>AUDIT CENTER</strong>
          <form>
            <input id="email" type="text" placeholder="Digite seu email" />

            <input id="senha" type="text" placeholder="Digite sua senha" />

            <Button type="submit">
              <Link to="/home">Entrar</Link>
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
