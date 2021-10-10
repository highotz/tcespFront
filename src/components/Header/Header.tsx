/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import SideBarContext from '../../contexts/sideBar';
import AuthContext from '../../contexts/authContext';
import { LogoutButton } from '../LogoutButton/LogoutButton';

import logoTcespHome from '../../assets/images/logo_audit_retangular_clean.png';
import { Container, Logo } from './Header.Styled';

const Header: React.FC<{ history: any }> = ({ history }) => {
  const { opened } = useContext(SideBarContext);
  const { signOut } = useContext(AuthContext);

  const handleSigOut = () => {
    history.push('/');
    signOut();
  };
  return (
    <Container>
      {!opened ? (
        <div>
          <Logo src={logoTcespHome} alt="logo_image" srcSet="" />
        </div>
      ) : (
        <div />
      )}
      <LogoutButton onClick={handleSigOut}>Sair</LogoutButton>
    </Container>
  );
};

export default Header;
