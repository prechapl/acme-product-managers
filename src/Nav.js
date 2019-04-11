import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { activeManagersThunk } from './store';

class Nav extends Component {
  componentDidMount() {
    this.props.activeManagersThunk().catch(ex => console.log(ex));
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.activeManagers.length !== prevProps.activeManagers.length) {
  //     // this.props.history.push('/api/products');
  //     this.props.activeManagersThunk().catch(ex => console.log(ex));
  //   }
  // }

  render() {
    const pathname = location.pathname;
    const links = ['/api/home', '/api/products', '/api/managers'];
    const activeMans = this.props.activeManagers;
    // console.log('managers in Nav', activeMans);
    // console.log('props in Nav', this.props);

    return (
      <nav className="nav">
        <a className="navBar-brand mb-0 h1">ACME</a>

        <ul className="nav">
          {links.map(link => (
            <li className="nav-item" key={link}>
              <Link
                to={link}
                className={`nav-link${link === pathname ? ' active' : ''}`}
              >
                {link === '/api/managers' ? (
                  <span className="badge badge-pill badge-light">
                    {activeMans.length}
                  </span>
                ) : (
                  ''
                )}
                {link.slice(5)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    activeManagersThunk: () => dispatch(activeManagersThunk())
  };
};

const mapStateToProps = state => {
  return {
    activeManagers: state.activeManagers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

// export default Nav;
