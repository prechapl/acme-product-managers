import React, { Component } from 'react';
// import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';
import store, { fetchProducts } from './store';

class App extends Component {
  componentDidMount() {
    console.log('AppDidMount');
    this.props.fetchProducts().catch(error => console.log(error));
  }

  render() {
    // const products = this.props.fetchProducts();
    // console.log('app render products', products);
    return (
      <Provider store={store}>
        <Router>
          <Route render={({ location }) => <Nav location={location} />} />
          <Route
            path="/products"
            render={() => <Products products={products} />}
          />
          <Route path="/managers" component={Managers} />
          <Route path="/" component={Home} />
        </Router>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

const mapStateToProps = state => {
  console.log('state in mapStateToProps ', state);
  return {
    products: state
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
