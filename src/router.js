import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
// import Index from './views/index'
// import Watermark from './views/watermark'
const Index = lazy(() => import('./views/index'));
const Watermark = lazy(() => import('./views/watermark'));

class Routers extends React.PureComponent {
  render() {
    return (
      <>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/watermark" component={Watermark} />
            </Switch>
          </Suspense>
        </Router>
      </>
    );
  }
}

export default withRouter(Routers);
