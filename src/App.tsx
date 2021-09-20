import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { CadastroMunicipio } from './pages/CadastroMunicipio';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/register_city" exact component={CadastroMunicipio} />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
