/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import SideBarContext from '../../contexts/sideBar';
import { LogoutButton } from '../LogoutButton/LogoutButton';

import logoTcespHome from '../../assets/images/logo_audit_retangular_clean.png';
import { Container, Logo } from './Header.Styled';

const Header: React.FC = () => {
  const { opened } = useContext(SideBarContext);
  return (
    <Container>
      {!opened ? (
        <div>
          <Logo src={logoTcespHome} alt="logo_image" srcSet="" />
        </div>
      ) : (
        <div />
      )}
      <LogoutButton>Sair</LogoutButton>
    </Container>
  );
};

export default Header;
