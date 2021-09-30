/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';

import { LogoutButton } from '../LogoutButton/LogoutButton';

import logoTcespHome from '../../assets/images/logo_audit_retangular.png';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header>
      <img src={logoTcespHome} alt="logo TCESP" />

      <LogoutButton>Sair</LogoutButton>
    </header>
  );
};

export default Header;
