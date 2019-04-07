import React, { Component } from 'react';
import { fetchProducts } from './store';

class Products extends Component {
  componentDidMount() {
    fetchProducts().catch(error => console.log(error));
  }

  render() {
    // const products = this.props.products;
    // console.log('products in Products render', products);
    return (
      <div>
        <ul>
          {products.map(product => {
            return <li key={product.id}>{product.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Products;
