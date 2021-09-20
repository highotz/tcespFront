import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/Login';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
