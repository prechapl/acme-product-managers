import React, { Component } from 'react';
import { connect } from 'react-redux';

class Products extends Component {
  findManagerName = (product, managers) => {
    if (managers.length) {
      if (product.managerId) {
        return managers.filter(manager => manager.id === product.managerId)[0]
          .name;
      } else {
        return 'nobody';
      }
    }
  };

  render() {
    const products = this.props.products;
    const managers = this.props.managers;
    // console.log('products in Products render', products);
    // console.log('managers in Products render', managers);

    return (
      <div>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                {product.name} is managed by:
                {this.findManagerName(product, managers)}
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

export default connect(mapStateToProps)(Products);
