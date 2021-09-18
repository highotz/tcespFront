import { Button } from '../components/Button';

import logo_tcesp from '../assets/images/logo_login.jpeg';
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
          <img src={logo_tcesp} alt="TCESP" />
          <strong>AUDIT CENTER</strong>
          <form>
            <input id="email" type="text" placeholder="Digite seu email" />

            <input id="senha" type="text" placeholder="Digite sua senha" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
