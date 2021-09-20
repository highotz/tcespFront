/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { FiChevronsLeft } from 'react-icons/fi';
import {
  Container,
  SideBar,
  Content,
  NavBar,
  Resume,
  Footer,
  TopProblems,
  Graphs,
} from './Home.styled';

const Home: React.FC = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <Container>
      <SideBar open={isOpen}>
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
          <h1>Home</h1>
          <ul>
            Cadastro
            <li>
              <Link to="/register_city">Municipio</Link>
            </li>
          </ul>
        </div>
      </SideBar>
      <Content>
        <NavBar>
          <h1>Nav bar</h1>
        </NavBar>
        <Resume>
          <Graphs>
            <div>
              <h1>Graficos</h1>
            </div>
            <div>
              <h1>Graficos</h1>
            </div>
          </Graphs>
          <TopProblems>
            <div>
              <h1>top municipios problemas</h1>
            </div>
            <div>
              <h1>Chamados abertos</h1>
            </div>
          </TopProblems>
        </Resume>
        <Footer>
          <p>FIAP</p>
          <p>
            {' '}
            <strong>Audit Center</strong> ®
          </p>
          <p>TCESP</p>
        </Footer>
      </Content>
    </Container>
  );
};

export default Home;
