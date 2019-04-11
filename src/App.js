import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';
import Nav from './Nav';
// import { activeManagersThunk } from './store';

class App extends Component {
  // componentDidMount() {
  //   this.props.activeManagersThunk().catch(ex => console.log(ex));
  // }

  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route render={({ location }) => <Nav location={location} />} />
          {/* <Route path="/api/products" render={() => <Products />} /> */}
          <Route path="/api/products" component={Products} />
          <Route path="/api/managers" component={Managers} />
          <Route path="/api/home" component={Home} />
        </HashRouter>
      </Fragment>
    );
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     activeManagersThunk: () => dispatch(activeManagersThunk())
//   };
// };

// const mapStateToProps = state => {
//   return {
//     activeManagers: state.activeManagers
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
