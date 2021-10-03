/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import {
  FiChevronsLeft,
  FiHome,
  FiList,
  FiMap,
  FiPhoneCall,
} from 'react-icons/fi';

import { SideBar, NavigationLinks, LogoDiv } from './SideBar.styled';
import SideBarContext from '../../contexts/sideBar';
import logoTcespHome from '../../assets/images/logo_audit_retangular_clean.png';

const SideMenu: React.FC<{ page: string }> = ({ page }) => {
  const { opened, opening } = useContext(SideBarContext);
  return (
    <SideBar id="side-menu" open={opened}>
      <button type="button" onClick={() => opening()}>
        <FiChevronsLeft
          style={{
            transform: opened ? 'rotateY(0)' : 'rotateY(180deg) ',
            animation: 'transform 0.3s ease-in-out',
          }}
          size={30}
        />
      </button>

      {opened ? (
        <LogoDiv>
          <img src={logoTcespHome} alt="logo_image" />
        </LogoDiv>
      ) : null}

      <div style={{ visibility: opened ? 'visible' : 'hidden' }}>
        <ul>
          <li>
            <NavigationLinks currentPage={page === 'home'} to="/home">
              <i>
                <FiHome />
              </i>
              Home
            </NavigationLinks>
          </li>
          <li>
            <NavigationLinks
              currentPage={page === 'register'}
              to="/register-city"
            >
              <i>
                <FiMap />
              </i>
              Cadastro Municipio
            </NavigationLinks>
          </li>
          <li>
            <NavigationLinks currentPage={page === 'tickets'} to="/all-tickets">
              <i>
                <FiList />
              </i>
              Todos os Chamados
            </NavigationLinks>
          </li>
          <li>
            <NavigationLinks currentPage={page === 'faq'} to="/faq">
              <i>
                <FiPhoneCall />
              </i>
              Fale Conosco
            </NavigationLinks>
          </li>
        </ul>
      </div>
    </SideBar>
  );
};

export default SideMenu;
