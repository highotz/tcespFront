/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import { Button } from '../../components/Button/Button';
import './form.scss';

const RegisterCity: React.FC = () => {
  return (
    <div className="cadastro-municipio">
      <strong>Cadastro dos Sites dos Municípios</strong>
      <div className="form-cadastro">
        <form>
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
  );
};
export default RegisterCity;
