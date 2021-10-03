import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { RegisterCity } from '../pages/RegisterCity';
import { AllTickets } from '../pages/AllTickets';
import { SideBarProvider } from '../contexts/sideBar';
import TinyLines from '../components/Footer/Footer';
import SideMenu from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';

import { Container, Content } from './App.Routes.styles';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Container>
        <SideBarProvider>
          <SideMenu>
            <h1>Home</h1>
          </SideMenu>
          <Content>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/register-city" component={RegisterCity} />
            <Route path="/all-tickets" component={AllTickets} />
            <TinyLines />
          </Content>
        </SideBarProvider>
      </Container>
    </Switch>
  );
};

<Route component={Home} />;

export default AppRoutes;
