/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Modal } from 'antd';
import MaterialTable from 'material-table';
import 'antd/dist/antd.css';

import { toast } from 'react-toastify';
import {
  Content,
  Breadcrumb,
  Register,
  Find,
  Button,
} from './RegisterUsers.Styled';
import api from '../../api';
import translateTable from '../../utils/tableTranslate';
import headers from '../../utils/getHeaders';

const RegisterUsers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [idUser, setIdUser] = useState('');
  const [tableData, setTableData] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleData = async () => {
    const response = await api.get('/users/all-users', headers);
    setTableData(response.data);
  };

  useEffect(() => {
    handleData();
  }, [isModalVisible]);

  useEffect(() => {
    handleData();
  }, [isModalVisible]);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (rowData) => {
    setIsModalVisible(false);
    setUserName(rowData.name);
    setIdUser(rowData.id_tecesp);
    setUserEmail(rowData.email);
  };

  const clearForm = () => {
    setUserEmail('');
    setUserName('');
    setUserPassword('');
    setIdUser('');
  };

  const updateUser = async () => {
    // try {
    //   api.patch(`/citys/update-url/${idMunicipio}`, {
    //     name: municipio,
    //     site: url,
    //   });

    //   toast.success(
    //     `Dados do município ${municipio} atualizados com sucesso !`,
    //     {
    //       position: 'top-center',
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     },
    //   );
    //   clearForm();
    // } catch (error) {
    //   const [token, idUser] = getCredentials();
    //   api.patch(
    //     `/citys/update-url/${idMunicipio}`,
    //     {
    //       name: municipio,
    //       site: url,
    //     },
    //     {
    //       headers: {
    //         authorization: `Bearer ${token.replaceAll('"', '')}`,
    //         userId: idUser.replaceAll('"', ''),
    //       },
    //     },
    //   );
    //   toast.success(
    //     `Dados do município ${municipio} atualizados com sucesso !`,
    //     {
    //       position: 'top-center',
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     },
    //   );
    //   clearForm();
    // }

    toast.success(`Dados do usuario ${userName} atualizados com sucesso !`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    clearForm();
  };

  const createUser = async () => {
    if (!userName || !userEmail || !userPassword) {
      toast.error('Preencha todos os campos !!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const response = await api.post(
      `/users`,
      {
        name: userName,
        email: userEmail,
        password: userPassword,
      },
      headers,
    );
    if (response.status === 201) {
      toast.success(`Usuario ${userName} criado com sucesso`, {
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
    if (idUser && userName) {
      updateUser();
    } else {
      createUser();
    }
  };
  return (
    <Content>
      <Breadcrumb>
        <strong>Cadastros</strong>
        <strong>/</strong>
        <strong>Usuários</strong>
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
            title="Usuarios cadastrados"
            columns={[
              { title: 'id', field: 'id_tecesp', hidden: true },
              { title: 'Nome', field: 'name' },
              { title: 'Email', field: 'email' },
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
        <h1>Cadastro de Usuarios</h1>
        <form>
          <input
            id="cod_usuario"
            type="hidden"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
          />
          <input
            id="name"
            type="text"
            placeholder="Digite o nome do Usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            id="email"
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Digite o email do usuário"
          />

          <input
            id="password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Digite a senha do usuário"
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
              {idUser && userName ? 'Atualizar' : 'Cadastrar'}
            </Button>

            {idUser && userName ? (
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
export default RegisterUsers;
