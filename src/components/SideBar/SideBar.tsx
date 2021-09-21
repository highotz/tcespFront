/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronsLeft } from 'react-icons/fi';

import { SideBar } from '../../pages/Home/Home.styled';
import './link.scss';

const SideMenu: React.FC = () => {
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
          Menu:
          <li>
            <Link className="link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/register-city">
              Cadastro Municipio
            </Link>
          </li>
          <li>
            <Link className="link" to="/all-tickets">
              Todos os Chamados
            </Link>
          </li>
          <li>
            <Link className="link" to="/faq">
              Fale Conosco
            </Link>
          </li>
        </ul>
      </div>
    </SideBar>
  );
};

export default SideMenu;
