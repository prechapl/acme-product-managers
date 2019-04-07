import React, { Component } from 'react';
import { connect } from 'react-redux';

class Managers extends Component {
  render() {
    const managers = this.props.managers;
    console.log('managers', managers);
    return (
      <div>
        <ul>
          {managers.map(manager => {
            return <li key={manager.id}>{manager.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    managers: state.managers
  };
};

export default connect(mapStateToProps)(Managers);
