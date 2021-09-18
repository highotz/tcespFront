import logo_tcesp from '../assets/images/logo_login.jpeg';
import '../styles/login.scss';

export function Login() {
  return (
    <div id="page-auth">
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
          <form>
            <input type="text" placeholder="Digite seu email"/>
            <input type="text" placeholder="Digite sua senha"/>
          </form>
        </div>
      </main>
    </div>
  );
}
