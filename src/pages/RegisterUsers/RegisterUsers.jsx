/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
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

const RegisterUsers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [idUser, setIdUser] = useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (rowData) => {
    setIsModalVisible(false);
    setUserName(rowData.name);
    setIdUser(rowData.idUser);
  };

  const handleSubmit = () => {
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
                onClick: (event, rowData) => handleEdit(rowData),
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

          <Button type="button" onClick={handleSubmit}>
            {idUser && userName ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </form>
      </Register>
    </Content>
  );
};
export default RegisterUsers;
