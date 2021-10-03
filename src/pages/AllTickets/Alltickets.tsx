/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import Filters from '../../components/Filters/Filters';
import Table from '../../components/TableTickets/TableTickects';
import { Button } from '../../components/Button/Button';
import './form.scss';

const AllTickets: React.FC = () => {
  return (
    <div className="content">
      <div className="cadastro-municipio">
        <strong>Cadastro dos Sites dos Municípios</strong>
        <div className="form-cadastro">
          <Filters>
            <Button>Filtrar</Button>
          </Filters>
        </div>
      </div>

      <div className="list">
        <Table />
      </div>
    </div>
  );
};

export default AllTickets;
