/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { FiChevronsLeft, FiHome, FiList, FiMap, FiUser } from 'react-icons/fi';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { SideBar, NavigationLinks, LogoDiv, DropDown } from './SideBar.styled';
import SideBarContext from '../../contexts/sideBar';
import AuthContext from '../../contexts/authContext';
import logoTcespHome from '../../assets/images/logo_audit_retangular_clean.png';

const SideMenu: React.FC = () => {
  const { opened, opening, getPage, page } = useContext(SideBarContext);
  const { admin } = useContext(AuthContext);
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
              to="/"
              onClick={() => getPage('home')}
            >
              <span>
                <FiHome />
              </span>
              Home
            </NavigationLinks>
          </li>
          {admin ? (
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
                    to="/register-user"
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
          ) : null}

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
        </ul>
      </div>
    </SideBar>
  );
};

export default SideMenu;
