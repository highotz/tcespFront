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

const { Option } = Select;

const Audit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [cityId, setCityId] = useState('');
  const [city, setCity] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  // const [isAuditing, setIsAuditing] = useState(false);
  const [formValues, setFormValues] = useState([
    { title: '', description: '', status: '' },
  ]);

  const handleData = async () => {
    const response = await api.get('/citys');

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
    setFormValues([{ title: '', description: '' }]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataSubmit = {
      city_id: cityId,
      due_date: dueDate,
      itens: formValues,
    };
    alert(JSON.stringify(dataSubmit));
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
                placeholder="Problema"
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
