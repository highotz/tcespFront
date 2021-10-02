/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';

import Header from '../components/Header/Header';
import SideMenu from '../components/SideBar/SideBar';
import Filters from '../components/Filters/Filters';
import Table from '../components/TableTickets/TableTickects';
import { Button } from '../components/Button/Button';

import { Container } from './Home/Home.styled';
import '../styles/form.scss';

const AllTickets: React.FC = () => {
  return (
    <Container>
      <SideMenu page="tickets" />
      <div className="content">
        <Header />
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
    </Container>
  );
};

export default AllTickets;
