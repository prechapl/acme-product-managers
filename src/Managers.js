import React, { Component } from 'react';
import { connect } from 'react-redux';

class Managers extends Component {
  render() {
    const managers = this.props.managers;
    const products = this.props.products;

    const uniqueManagerIds = products.reduce((manIds, product) => {
      if (product.managerId && !manIds.includes(product.managerId)) {
        manIds.push(product.managerId);
      }
      return manIds;
    }, []);

    const activeManagers = managers.filter(manager =>
      uniqueManagerIds.includes(manager.id));

    //why is this logging 3 times?
    // console.log('Unique Managers', activeManagers);

    return (
      <div>
        <ul>
          {activeManagers.map(manager => {
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
const mapStateToProps = state => {
  return {
    products: state.products,
    managers: state.managers
  };
};

export default connect(mapStateToProps)(Managers);
