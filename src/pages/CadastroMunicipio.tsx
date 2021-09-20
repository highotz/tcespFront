/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import { Button } from '../components/Button';
import { LogoutButton } from '../components/LogoutButton';

import logoTcespHome from '../assets/images/logo_tecesp_home.svg';

import '../styles/header.scss';

export function CadastroMunicipio() {
  return (
    <div id="page-cadastro">
      <header>
        <img src={logoTcespHome} alt="logo TCESP" />

        <LogoutButton>Sair</LogoutButton>
      </header>

      <main>
        <div className="cadastro-municipio">
          <strong>Cadastro dos Sites dos Municípios</strong>
          <div className="form-cadastro">
            <form action="">
              <label htmlFor="municipio">Município:</label>
              <input
                id="municipio"
                type="text"
                placeholder="Digite o nome do Município"
              />

              <label htmlFor="site">Site:</label>
              <input
                id="site"
                type="text"
                placeholder="Digite o site do Município"
              />

              <Button>Enviar</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
