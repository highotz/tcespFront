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
  FiUser,
} from 'react-icons/fi';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { SideBar, NavigationLinks, LogoDiv, DropDown } from './SideBar.styled';
import SideBarContext from '../../contexts/sideBar';
import logoTcespHome from '../../assets/images/logo_audit_retangular_clean.png';

const SideMenu: React.FC = () => {
  const { opened, opening, getPage, page } = useContext(SideBarContext);
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
            <NavigationLinks
              currentPage={page === 'home'}
              to="/dashboards"
              onClick={() => getPage('home')}
            >
              <span>
                <FiHome />
              </span>
              Home
            </NavigationLinks>
          </li>
          <DropDown>
            <i>
              <RiArrowDropDownLine style={{ marginLeft: 0 }} size={40} />{' '}
              Cadastros
            </i>
            <div>
              <li>
                <NavigationLinks
                  currentPage={page === 'register'}
                  to="/register-city"
                  onClick={() => getPage('register')}
                >
                  <span>
                    <FiMap />
                  </span>
                  <p>Municipios</p>
                </NavigationLinks>
              </li>
              <li>
                <NavigationLinks
                  currentPage={page === 'register'}
                  to="/register-city"
                  onClick={() => getPage('register')}
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <span>
                    <FiUser />
                  </span>
                  Usuarios
                </NavigationLinks>
              </li>
            </div>
          </DropDown>

          <li>
            <NavigationLinks
              currentPage={page === 'tickets'}
              to="/all-tickets"
              onClick={() => getPage('tickets')}
            >
              <span>
                <FiList />
              </span>
              Todos os Chamados
            </NavigationLinks>
          </li>
          <li>
            <NavigationLinks
              currentPage={page === 'faq'}
              to="/faq"
              onClick={() => getPage('faq')}
            >
              <span>
                <FiPhoneCall />
              </span>
              Fale Conosco
            </NavigationLinks>
          </li>
        </ul>
      </div>
    </SideBar>
  );
};

export default SideMenu;
