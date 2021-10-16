/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Modal } from 'antd';
import MaterialTable from 'material-table';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';
import api from '../../api';
import translateTable from '../../utils/tableTranslate';

import {
  Content,
  Breadcrumb,
  Register,
  Find,
  Button,
} from './RegisterCity.Styled';

const RegisterCity = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [url, setUrl] = useState('');
  const [idMunicipio, setIdMunicipio] = useState('');
  const [tableData, setTableData] = useState([]);

  const getCredentials = () => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    return [token, idUser];
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleData = async () => {
    try {
      const response = await api.get('/citys');
      setTableData(response.data);
    } catch (error) {
      const [token, idUser] = getCredentials();
      const response = await api.get('/citys', {
        headers: {
          authorization: `Bearer ${token.replaceAll('"', '')}`,
          userId: idUser.replaceAll('"', ''),
        },
      });
      setTableData(response.data);
    }
  };

  useEffect(() => {
    handleData();
  }, [isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleEdit = async (rowData) => {
    try {
      const response = await api.get(`/citys/${rowData.id}`);
      const idCity = response.data.id;
      const nameCity = response.data.name;
      const urlCity = response.data.site;
      setIsModalVisible(false);
      setIdMunicipio(idCity);
      setMunicipio(nameCity);
      setUrl(urlCity);
    } catch (error) {
      const [token, idUser] = getCredentials();
      const response = await api.get(`/citys/${rowData.id}`, {
        headers: {
          authorization: `Bearer ${token.replaceAll('"', '')}`,
          userId: idUser.replaceAll('"', ''),
        },
      });
      const idCity = response.data.id;
      const nameCity = response.data.name;
      const urlCity = response.data.site;
      setIsModalVisible(false);
      setIdMunicipio(idCity);
      setMunicipio(nameCity);
      setUrl(urlCity);
    }
  };
  const clearForm = () => {
    setUrl('');
    setIdMunicipio('');
    setMunicipio('');
  };

  const updateCity = async () => {
    try {
      api.patch(`/citys/update-url/${idMunicipio}`, {
        name: municipio,
        site: url,
      });

      toast.success(
        `Dados do município ${municipio} atualizados com sucesso !`,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
      clearForm();
    } catch (error) {
      const [token, idUser] = getCredentials();
      api.patch(
        `/citys/update-url/${idMunicipio}`,
        {
          name: municipio,
          site: url,
        },
        {
          headers: {
            authorization: `Bearer ${token.replaceAll('"', '')}`,
            userId: idUser.replaceAll('"', ''),
          },
        },
      );
      toast.success(
        `Dados do município ${municipio} atualizados com sucesso !`,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
      clearForm();
    }
  };

  const createCity = async () => {
    try {
      api.post(`/citys`, {
        name: municipio,
        site: url,
      });

      toast.success(`Município ${municipio} criado com sucesso`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearForm();
    } catch (error) {
      const [token, idUser] = getCredentials();
      api.post(
        `/citys`,
        {
          name: municipio,
          site: url,
        },
        {
          headers: {
            authorization: `Bearer ${token.replaceAll('"', '')}`,
            userId: idUser.replaceAll('"', ''),
          },
        },
      );
      toast.success(`Município ${municipio} criado com sucesso`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearForm();
    }
  };

  const handleSubmit = () => {
    if (!municipio || !url) {
      toast.error('Preencha todos os campos !!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (idMunicipio && municipio) {
      updateCity();
    } else {
      createCity();
    }
  };
  return (
    <Content>
      <Breadcrumb>
        <strong>Cadastros</strong>
        <strong>/</strong>
        <strong>Municípios</strong>
      </Breadcrumb>
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
          width={700}
        >
          <MaterialTable
            title="Municípios cadastrados"
            columns={[
              { title: 'id', field: 'id', hidden: true },
              { title: 'Município', field: 'name' },
            ]}
            data={tableData}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => handleEdit(rowData),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
            localization={translateTable}
          />
        </Modal>
      </Find>
      <Register>
        <h1>Cadastro de Municípios</h1>
        <form>
          <input
            id="cod_municipio"
            type="hidden"
            value={idMunicipio}
            onChange={(e) => setIdMunicipio(e.target.value)}
          />
          <input
            id="municipio"
            type="text"
            placeholder="Digite o nome do Município"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
          />

          <input
            id="site"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Digite a URL do portal da transparência"
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 20,
              height: 50,
              width: 500,
              marginLeft: '4%',
            }}
          >
            <Button type="button" onClick={handleSubmit}>
              {idMunicipio && municipio ? 'Atualizar' : 'Cadastrar'}
            </Button>

            {idMunicipio && municipio ? (
              <Button type="button" onClick={clearForm}>
                Limpar
              </Button>
            ) : null}
          </div>
        </form>
      </Register>
    </Content>
  );
};
export default RegisterCity;
