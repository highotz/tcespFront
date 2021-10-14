import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Home } from '../pages/Home';
import { RegisterCity } from '../pages/RegisterCity';
import { RegisterUsers } from '../pages/RegisterUsers';
import { AllTickets } from '../pages/AllTickets';
import { SideBarProvider } from '../contexts/sideBar';
import TinyLines from '../components/Footer/Footer';
import SideMenu from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';

import { Container, Content } from './App.Routes.styles';
import { Audit } from '../pages/Audit';

const AppRoutes: React.FC = () => {
  const history = useHistory();
  return (
    <Switch>
      <Container>
        <SideBarProvider>
          <SideMenu>
            <h1>Home</h1>
          </SideMenu>
          <Content>
            <Header history={history} />
            <Route path="/" exact component={Home} />
            <Route path="/audit" component={Audit} />
            <Route path="/register-city" component={RegisterCity} />
            <Route path="/register-user" component={RegisterUsers} />
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
