import React, { Component } from 'react';
import { connect } from 'react-redux';

class Products extends Component {
  render() {
    console.log('in Products render', this.props.products);
    const products = this.props.products;
    return (
      <div>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                {product.name}
                <div>managerId: {product.managerId}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in mapStateToProps ', state);
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Products);
