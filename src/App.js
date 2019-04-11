import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route render={({ location }) => <Nav location={location} />} />
          <Route path="/api/products" component={Products} />
          <Route path="/api/managers" component={Managers} />
          <Route path="/api/home" component={Home} />
        </HashRouter>
      </Fragment>
    );
  }
}

export default App;
