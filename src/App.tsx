import { BrowserRouter, Route } from 'react-router-dom'

import { Login } from './pages/Login'
import {CadastroMunicipio} from './pages/CadastroMunicipio';

function App() {
  return (
    <BrowserRouter>
      {/* <Route path='/' exact component={Login} /> */}
      <Route path='/' exact component={CadastroMunicipio} />
  </BrowserRouter>
  );
}

export default App;
