/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { Container, Content, Resume } from './Home.styled';

import TinyLines from '../../components/Footer/Footer';
import SideMenu from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import Graphs from '../../components/Graphs/Graphs';
import TopProblem from '../../components/TopProblems/TopProblems';

const Home: React.FC = () => {
  return (
    <Container>
      <SideMenu />
      <Content>
        <Header />
        <Resume>
          <Graphs />
          <TopProblem />
        </Resume>
        <TinyLines />
      </Content>
    </Container>
  );
};

export default Home;
