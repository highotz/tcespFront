import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { CadastroMunicipio } from './pages/RegisterCity';
import AllTickets from './pages/Alltickets';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/register-city" exact component={CadastroMunicipio} />
      <Route path="/all-tickets" exact component={AllTickets} />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
