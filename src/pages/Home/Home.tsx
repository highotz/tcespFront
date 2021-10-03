/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import { Container, Content, Resume } from './Home.styled';

import TinyLines from '../../components/Footer/Footer';
import SideMenu from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import Graph from '../../components/Graphs/Graphs';
import TopProblem from '../../components/TopProblems/TopProblems';
import { SideBarProvider } from '../../contexts/sideBar';

const Home: React.FC = () => {
  return (
    <Container>
      <SideBarProvider>
        <SideMenu page="home">
          <h1>Home</h1>
        </SideMenu>
        <Content>
          <Header />
          <Resume>
            <Graph />
            <TopProblem />
          </Resume>
          <TinyLines />
        </Content>
      </SideBarProvider>
    </Container>
  );
};

export default Home;
