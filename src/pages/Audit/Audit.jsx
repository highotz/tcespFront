/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import MaterialTable from 'material-table';
import { FiSearch } from 'react-icons/fi';

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
    } else if (e === 'NOK') {
      const renamedStatus = 'pending';
      newFormValues[i].status = renamedStatus;
      setFormValues(newFormValues);
    } else {
      const renamedStatus = 'ok';
      newFormValues[i].status = renamedStatus;
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

  //  {
  //    parei aqui, preciso parar o submit do form se o valor do item estiver vazio
  //  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateItens()) {
      const ticketSubmit = {
        city_id: cityId,
        due_date: dueDate,
        itens: formValues,
        description: '',
        status: '',
        title: '',
      };
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
        <button type="button" onClick={showModal}>
          <i>
            <FiSearch />
          </i>
          Buscar
        </button>
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
                <Option value="NOK">NOK</Option>
                <Option value="OK">OK</Option>
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
              {index !== formValues.length - 1 ? (
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
            }}
          >
            <Button type="submit">Finalizar</Button>
          </div>
        </Form>
      ) : null}
    </Container>
  );
};

export default Audit;
