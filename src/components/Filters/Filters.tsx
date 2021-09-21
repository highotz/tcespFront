/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Button } from '../Button/Button';
import './filters.scss';

const Filters: React.FC = () => {
  return (
    <div id="filter">
      <form className="form">
        <label htmlFor="numero_chamado">Número Chamado:</label>
        <input
          id="numero_chamado"
          type="text"
          placeholder="Digite o nome do Número Chamado"
        />

        <label htmlFor="municipio">Município:</label>
        <input
          id="municipio"
          type="text"
          placeholder="Digite o nome do Município"
        />

        <label htmlFor="data_abertura">Data Abertura:</label>
        <input id="data_abertura" type="date" />

        <label htmlFor="Status">Status:</label>
        <input id="Status" type="text" placeholder="Digite o Status" />
      </form>
      <Button>Filtrar</Button>
    </div>
  );
};

export default Filters;
