import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import RegisterCustomer from './pages/Register/Customer';

const Pagina404 = () => (<div>Página 404</div>);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/register/customer" component={RegisterCustomer}/>
      <Route path="/" component={Home} exact/>
      <Route component={Pagina404}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

