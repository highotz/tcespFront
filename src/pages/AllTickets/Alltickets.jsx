/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */

import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './form.scss';
import ClipLoader from 'react-spinners/ClipLoader';

import { Content, Breadcrumb, Table } from './AllTickets.Styled';
import api from '../../api';
import headers from '../../utils/getHeaders';

const AllTickets = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleData = async () => {
    setLoading(true);
    const responseTickets = await api.get('/tickets', headers);

    // Pega os id_city unicos
    const ticketsCitys = [
      ...new Set(responseTickets.data.map((value) => value.city_id)),
    ];
    // com os id unicos pegamos os nomes dos respectivos ids
    const namesCitys = await Promise.all(
      ticketsCitys.map(
        async (value) => (await api.get(`/citys/${value}`, headers)).data.name,
      ),
    );

    // Pega todos os ids dos tickets
    const IdsTickets = responseTickets.data.map((value) => value.id);

    // com os id unicos pegamos os nomes dos respectivos ids
    const itensById = await Promise.all(
      IdsTickets.map(
        async (value) =>
          (
            await api.get(`/tickets/items/${value}`, headers)
          ).data,
      ),
    );

    // Pega o id_user unico
    const ticketsUser = [
      ...new Set(responseTickets.data.map((value) => value.user_id)),
    ];
    // com os id unicos pegamos os nomes dos usuarios
    const namesUsers = await Promise.all(
      ticketsCitys.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (value) => (await api.get(`/users/all-users`, headers)).data,
      ),
    );
    const namesUsersHandled = namesUsers[0].map((value) => value.name);
    const reponseAdjust = responseTickets.data.map((value) => {
      return {
        id_ticket: value.id,
        userName: namesUsersHandled[ticketsUser.indexOf(value.user_id)],
        cityName: namesCitys[ticketsCitys.indexOf(value.city_id)],
        date_audit: new Date(value.due_date).toLocaleDateString('pt-BR'),
        itens: itensById[IdsTickets.indexOf(value.id)],
      };
    });
    setTableData(reponseAdjust);
    setLoading(false);
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <Content>
      <Breadcrumb>
        <strong>Todas as Auditorias</strong>
      </Breadcrumb>
      {/* <Find>
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
      </Find> */}
      <Table>
        {loading ? (
          <div
            style={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ClipLoader color="#3A81C3" loading={loading} size={150} />
          </div>
        ) : (
          <MaterialTable
            title="Auditorias"
            columns={[
              { title: 'id', field: 'id_ticket', hidden: true },
              { title: 'Usuario', field: 'userName' },
              { title: 'Município', field: 'cityName' },
              { title: 'Data da Audição', field: 'date_audit' },
              { title: 'itens', field: 'itens', hidden: true },
            ]}
            data={tableData}
            detailPanel={(rowData) => {
              return (
                <div>
                  <table
                    style={{
                      width: '80%',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      margin: 'auto',
                    }}
                  >
                    <thead
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <th>Item Auditado</th>
                      <th>Status</th>
                      <th>Comentarios</th>
                    </thead>
                    <tbody
                      style={{
                        width: '100%',
                      }}
                    >
                      {rowData.itens.map((value) => (
                        <tr
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <td
                            style={{
                              width: 100,
                              textTransform: 'capitalize',
                            }}
                          >
                            <p>{value.title}</p>
                          </td>
                          <td
                            style={{
                              width: 100,
                              textTransform: 'capitalize',
                            }}
                          >
                            <p>{value.status}</p>
                          </td>
                          <td
                            style={{
                              width: 100,
                              textTransform: 'capitalize',
                            }}
                          >
                            <p>{value.description}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
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
        )}
      </Table>
    </Content>
  );
};

export default AllTickets;
