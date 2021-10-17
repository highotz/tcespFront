/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import MaterialTable from 'material-table';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineAlert } from 'react-icons/ai';

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
  const [isAuditing, setIsAuditing] = useState(false);
  const [cityId, setCityId] = useState('');
  const [city, setCity] = useState('');

  const dueDate = new Date();

  // const [isAuditing, setIsAuditing] = useState(false);
  const [formValues, setFormValues] = useState([
    { title: '', description: '', status: '' },
  ]);

  const handleData = async () => {
    const response = await api.get('/citys', headers);

    if (response.status === 200) {
      setTableData(response.data);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    handleData();
  }, [isModalVisible]);

  const clearForm = () => {
    setFormValues([{ title: '', description: '', status: '' }]);
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
    setFormValues([...formValues, { title: '', description: '', status: '' }]);
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

      console.log(status);
      console.log(formValues);
      const ticketSubmit = {
        city_id: cityId,
        due_date: dueDate,
        itens: formValues,
        description: '',
        status,
        title: '',
      };
      const responseTicket = await api.post(
        '/tickets/new-ticket',
        ticketSubmit,
        headers,
      );
      console.log(ticketSubmit);
      console.log(responseTicket.data);
      if (responseTicket.status === 201) {
        const { id } = responseTicket.data;

        try {
          formValues.forEach(async (value, index) => {
            const response = await api.post(
              `/tickets/new-item/${id}`,
              {
                title: value.title,
                description: value.description,
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
  };

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
          <button type="button" onClick={showModal}>
            <i>
              <AiOutlineAlert />
            </i>
            Auditar
          </button>
          <button type="button" onClick={showModal}>
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
          <MaterialTable
            title="Escolha o Municipio para auditar"
            columns={[
              { title: 'id', field: 'id', hidden: true },
              { title: 'Município', field: 'name' },
              { title: 'Portal', field: 'site' },
            ]}
            onRowClick={(e, rowData) => {
              window.open(rowData.site, '_blank');
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
          {formValues.map((element, index) => (
            <DivInput key={index}>
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
          ))}
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button type="submit">Finalizar</Button>
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
