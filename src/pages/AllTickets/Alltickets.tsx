/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import MaterialTable from 'material-table';
import './form.scss';

import { Content, Breadcrumb, Table, Find, Button } from './AllTickets.Styled';

const AllTickets: React.FC = () => {
  return (
    <Content>
      <Breadcrumb>
        <strong>Busca de Chamados</strong>
      </Breadcrumb>
      <Find>
        <form className="form">
          <input
            id="numero_chamado"
            type="text"
            placeholder="Número do Chamado"
          />

          <input id="municipio" type="text" placeholder="Município" />

          <input
            id="data_abertura"
            type="date"
            placeholder="Data de Abertura"
          />

          <input id="Status" type="text" placeholder="Digite o Status" />
        </form>
        <button type="button">Filtrar</button>
      </Find>
      <Table>
        <MaterialTable
          title="Chamados"
          columns={[
            { title: 'id', field: 'idUser', hidden: true },
            { title: 'Nome', field: 'name' },
          ]}
          data={[
            {
              name: 'Admin',
              idUser: '1',
            },
            {
              name: 'Analista',
              idUser: '2',
            },
          ]}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (event, rowData) => console.log(rowData),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum registro para exibir',
            },
            header: {
              actions: 'Ações',
            },
            toolbar: {
              searchTooltip: 'Pesquisar',
              searchPlaceholder: 'Pesquisar',
            },
            pagination: {
              labelRowsSelect: 'linhas',
              labelDisplayedRows: '{count} de {from}-{to}',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Próxima página',
              lastTooltip: 'Última página',
            },
          }}
        />
      </Table>
    </Content>
  );
};

export default AllTickets;
