/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  FiChevronsLeft,
  FiHome,
  FiList,
  FiMap,
  FiPhoneCall,
} from 'react-icons/fi';

import { SideBar, NavigationLinks } from './SideBar.styled';

const SideMenu: React.FC<{ page: string }> = ({ page }) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <SideBar id="side-menu" open={isOpen}>
      <button type="button" onClick={() => setOpen(!isOpen)}>
        <FiChevronsLeft
          style={{
            transform: isOpen ? 'rotateY(0)' : 'rotateY(180deg) ',
            animation: 'transform 0.3s ease-in-out',
          }}
          size={30}
        />
      </button>
      <div style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
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
