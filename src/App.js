import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';
import { fetchProductsThunk } from './store';

class App extends Component {
  componentDidMount() {
    // console.log('AppDidMount');
    this.props
      .fetchProductsThunk()
      .then(result =>
        console.log('componentDidMount in App: products ', result.products))
      .catch(error => console.log(error));
  }

  render() {
    // const products = this.props.fetchProductsThunk();
    // console.log('App render: products', products);
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
    fetchProductsThunk: () => dispatch(fetchProductsThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
