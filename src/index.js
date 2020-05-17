import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Layout from './Layout/index';
import Routers from './router';

ReactDOM.render(
  <HashRouter>
    <Layout>
      <Routers />
    </Layout>
  </HashRouter>,
  document.getElementById('root'),
);
