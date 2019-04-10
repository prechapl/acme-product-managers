import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeManagersThunk } from './store';

const mapStateToProps = state => {
  return {
    activeManagers: state.activeManagers
  };
};

class Managers extends Component {
  componentDidMount() {
    this.props.activeManagersThunk().catch(ex => console.log(ex));
  }
  render() {
    const workingManagers = this.props.activeManagers;
    // console.log('workingManagers', workingManagers);
    return (
      <div>
        <ul>
          {workingManagers.map(manager => {
            return (
              <li key={manager.id}>
                {manager.name}'s ID is {manager.id}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activeManagersThunk: () => dispatch(activeManagersThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Managers);
