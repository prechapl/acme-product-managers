import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const products = this.props.products;

    const openings = products.reduce((openingsCount, prod) => {
      if (!prod.managerId) {
        openingsCount += 1;
      }
      return openingsCount;
    }, 0);

    const pluralProduct = openings === 1 ? 'product' : 'products';

    const availability =
      openings === products.length
        ? 'We have no products in need of management.'
        : ` We have ${openings} ${pluralProduct} in need of management!`;

    return <div>{availability}</div>;
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
