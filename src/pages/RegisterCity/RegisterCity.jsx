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
} from './RegisterCity.Styled';

const RegisterCity = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [url, setUrl] = useState('');
  const [idMunicipio, setIdMunicipio] = useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (rowData) => {
    setIsModalVisible(false);
    setIdMunicipio(rowData.idMunicipio);
    setMunicipio(rowData.municipio);
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
              { title: 'id', field: 'idMunicipio', hidden: true },
              { title: 'Município', field: 'municipio' },
            ]}
            data={[
              {
                municipio: 'São Bernardo do Campo',
                idMunicipio: '1',
              },
              {
                municipio: 'São José dos Campos',
                idMunicipio: '2',
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

          <Button type="button" onClick={handleSubmit}>
            {idMunicipio && municipio ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </form>
      </Register>
    </Content>
  );
};
export default RegisterCity;
