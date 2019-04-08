import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';
import { fetchProductsThunk, fetchManagersThunk } from './store';

class App extends Component {
  componentDidMount() {
    this.props.fetchProductsThunk().catch(error => console.log(error));
    this.props.fetchManagersThunk().catch(error => console.log(error));
  }

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

const mapDispatchToProps = dispatch => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk()),
    fetchManagersThunk: () => dispatch(fetchManagersThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
