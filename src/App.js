import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';
import { fetchProductsThunk } from './store';

class App extends Component {
  componentDidMount() {
    this.props.fetchProductsThunk().catch(ex => console.log(ex));
    // console.log('props in App', this.props);

    // this.props.fetchManagersThunk().catch(error => console.log(error));
  }

  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route render={({ location }) => <Nav location={location} />} />
          <Route path="/api/products" render={() => <Products />} />
          <Route path="/api/managers" component={Managers} />
          <Route path="/api/home" component={Home} />
        </HashRouter>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  // console.log('state in App', state);
  return {
    products: state
    // managers: state.managers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
