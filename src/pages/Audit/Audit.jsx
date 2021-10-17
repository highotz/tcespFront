/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import MaterialTable from 'material-table';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineAlert } from 'react-icons/ai';

import { ClipLoader } from 'react-spinners';
import {
  Container,
  Form,
  RemoveButton,
  AddButton,
  Find,
  Button,
  DivInput,
} from './Audit.Styled';
import translateTable from '../../utils/tableTranslate';
import api from '../../api';
import headers from '../../utils/getHeaders';
import {
  errorMessage,
  sucessMessage,
  warningMessage,
} from '../../utils/toastMensages';

const { Option } = Select;

const Audit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [ticketSubmit, setTicketSubmit] = useState({});
  const [tableDataHist, setTableDataHist] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityId, setCityId] = useState('');
  const [whatTable, setWhatTable] = useState('');
  const [city, setCity] = useState('');

  const dueDate = new Date();

  // const [isAuditing, setIsAuditing] = useState(false);
  const [formValues, setFormValues] = useState([
    { title: '', description: '', status: null },
  ]);

  const handleData = async () => {
    const response = await api.get('/citys', headers);

    if (response.status === 200) {
      setTableData(response.data);
    }
  };

  const handleDataHist = async () => {
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
        ticketCityId: value.city_id,
        ticketUserId: value.user_id,
        status: value.status,
        date_audit: new Date(value.due_date),
      };
    });
    setTableDataHist(reponseAdjust);
    setLoading(false);
  };

  const showModal = (table) => {
    setWhatTable(table);
    setIsModalVisible(true);
  };

  useEffect(() => {
    handleData();
    handleDataHist();
  }, [isModalVisible]);

  const clearForm = () => {
    setFormValues([{ id: '', title: '', description: '', status: '' }]);
    setCity('');
    setIsAuditing(false);
  };

  const validateItens = () => {
    const formIsEmpty = [
      ...new Set(formValues.map((value) => value.title === '')),
    ];
    if (formIsEmpty.length > 1) {
      warningMessage('Por favor preencher o item auditado !');
      return false;
    }
    if (formIsEmpty[0]) {
      warningMessage('Por favor preencher o item auditado !');
      return false;
    }

    return true;
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  // Form functions
  const handleChange = (i, e, type = 1) => {
    const newFormValues = [...formValues];

    if (type === 1) {
      newFormValues[i][e.target.name] = e.target.value;
      setFormValues(newFormValues);
    } else {
      newFormValues[i].status = e;
      setFormValues(newFormValues);
    }
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      { id: '', title: '', description: '', status: null },
    ]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateItens()) {
      const status =
        formValues.filter((value) => value.status === 'pending').length >= 1
          ? 'pending'
          : 'done';
      setTicketSubmit({
        city_id: cityId,
        due_date: new Date(),
        itens: formValues,
        description: '',
        status,
        title: '',
      });
      if (whatTable === 'audit') {
        const responseTicket = await api.post(
          '/tickets/new-ticket',
          ticketSubmit,
          headers,
        );
        if (responseTicket.status === 201) {
          const { id } = responseTicket.data;

          try {
            formValues.forEach(async (value, index) => {
              const response = await api.post(
                `/tickets/new-item/${id}`,
                {
                  title: value.title,
                  description: value.description,
                  status: value.status,
                },
                headers,
              );
              if (response.status !== 201) {
                throw new Error(`Problema ao criar o item ${index}`);
              }
            });
          } catch (error) {
            errorMessage('Erro ao salvar a auditoria....');
            return;
          }

          const mensage = `Auditoria do municipio ${city} salva com sucesso`;
          sucessMessage(mensage);
          clearForm();
        }
      }

      // Update da auditoria
      else {
        setTicketSubmit({
          id: ticketSubmit.id,
          city_id: ticketSubmit.city_id,
          due_date: ticketSubmit.due_date,
          description: '',
          status,
          title: '',
        });
        const responseTicket = await api.put(
          `tickets/update-ticket/${ticketSubmit.id}`,
          {
            id: ticketSubmit.id,
            city_id: ticketSubmit.city_id,
            due_date: ticketSubmit.due_date,
            description: '',
            status,
            title: '',
          },
          headers,
        );
        if (responseTicket.status === 200) {
          try {
            formValues.forEach(async (value, index) => {
              const response = await api.put(
                `/tickets/update-item/${value.id}`,
                {
                  title: value.title,
                  description: value.description,
                  status: value.status,
                  due_date: new Date(),
                },
                headers,
              );
              if (response.status !== 200) {
                throw new Error(`Problema ao atualizar o item ${index}`);
              }
            });
          } catch (error) {
            errorMessage('Erro ao atualizar a auditoria....');
            return;
          }

          const mensage = `Auditoria do municipio ${city} foi atualizada com sucesso`;
          sucessMessage(mensage);
          clearForm();
        }
      }
    }
  };

  const tables =
    whatTable === 'audit' ? (
      <MaterialTable
        title="Escolha o Municipio para auditar"
        columns={[
          { title: 'id', field: 'id', hidden: true },
          { title: 'Município', field: 'name' },
          { title: 'Portal', field: 'site' },
        ]}
        onRowClick={(e, rowData) => {
          window.open(rowData.site, '_blank');
          clearForm();
          setCityId(rowData.id);
          setCity(rowData.name);
          setIsModalVisible(false);
          setIsAuditing(true);
        }}
        data={tableData}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={translateTable}
      />
    ) : (
      <MaterialTable
        title="Auditorias historicas"
        columns={[
          { title: 'id', field: 'id_ticket', hidden: true },
          { title: 'id_user', field: 'ticketCityId', hidden: true },
          { title: 'id_user', field: 'ticketUserId', hidden: true },
          { title: 'Usuario', field: 'userName' },
          { title: 'Município', field: 'cityName' },
          {
            title: 'Situação',
            field: 'status',
            lookup: { done: 'finalizada', pending: 'pendente' },
          },
          { title: 'Data da Audição', field: 'date_audit', type: 'date' },
        ]}
        onRowClick={async (e, rowData) => {
          const response = await api.get(
            `tickets/items/${rowData.id_ticket}`,
            headers,
          );

          setFormValues(
            response.data.map((value) => {
              return {
                id: value.id,
                title: value.title,
                description: value.description,
                status: value.status,
              };
            }),
          );
          setTicketSubmit({
            id: rowData.id_ticket,
            city_id: rowData.ticketCityId,
            due_date: rowData.date_audit,
            description: '',
            status: rowData.status,
            title: '',
          });

          setCity(rowData.cityName);
          setIsModalVisible(false);
          setIsAuditing(true);
        }}
        data={tableDataHist}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={translateTable}
      />
    );

  return (
    <Container>
      <Find>
        <div
          style={{
            display: 'flex',
            width: '90%',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button type="button" onClick={() => showModal('audit')}>
            <i>
              <AiOutlineAlert />
            </i>
            Auditar
          </button>
          <button type="button" onClick={() => showModal('hist')}>
            <i>
              <FiSearch />
            </i>
            Historico
          </button>
        </div>

        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          okText="Fechar"
          closable={false}
          footer={[<Button onClick={handleOk}>Fechar</Button>]}
          width={900}
        >
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
            tables
          )}
        </Modal>
      </Find>
      {city ? (
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            marginTop: 30,
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              margin: 'auto',
              fontFamily: 'Now',
              fontWeight: '400',
            }}
          >
            Audição do município: <strong>{city}</strong>
          </h1>
        </div>
      ) : null}
      {isAuditing ? (
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="id_audit" />
          <input type="hidden" name="id_city" value={cityId} />
          <input type="hidden" name="dueDate" value={dueDate} />
          {formValues.map((element, index) => {
            let status = null;
            if (element.status) {
              status = element.status;
            }
            return (
              <DivInput key={index}>
                <input type="hidden" name="id" value={element.id || ''} />
                <input
                  type="text"
                  name="title"
                  placeholder="Item auditado"
                  value={element.title || ''}
                  onChange={(e) => handleChange(index, e)}
                />
                <Select
                  placeholder="Status do Item"
                  style={{
                    width: 150,
                    background: '#edf2f4',
                    borderRadius: 8,
                    marginTop: 12,
                    marginLeft: 14,
                    marginRight: 14,
                    height: 30,
                  }}
                  value={status}
                  onChange={(value) => handleChange(index, value, 0)}
                  bordered={false}
                >
                  <Option value="pending">NOK</Option>
                  <Option value="done">OK</Option>
                </Select>

                {formValues[index].status === 'pending' ? (
                  <input
                    type="text"
                    name="description"
                    placeholder="Comentarios"
                    value={element.description || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : null}

                {index === formValues.length - 1 ? (
                  <AddButton type="button" onClick={() => addFormFields()}>
                    <GrFormAdd />
                  </AddButton>
                ) : null}
                {index ? (
                  <RemoveButton
                    type="button"
                    onClick={() => removeFormFields(index)}
                  >
                    <GrFormSubtract />
                  </RemoveButton>
                ) : null}
              </DivInput>
            );
          })}
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button type="submit">
              {whatTable === 'audit' ? 'Finalizar' : 'Alterar'}
            </Button>
            <Button type="button" onClick={clearForm}>
              Cancelar
            </Button>
          </div>
        </Form>
      ) : null}
    </Container>
  );
};

export default Audit;
