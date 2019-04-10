import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from './DropDownMenu';
import { fetchProductsThunk, fetchManagersThunk } from './store';

class Products extends Component {
  componentDidMount() {
    this.props.fetchProductsThunk().catch(ex => console.log(ex));
    this.props.fetchManagersThunk().catch(ex => console.log(ex));
  }

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
    const { products, managers } = this.props;
    console.log('props in Product', this.props);

    return (
      <div>
        <ul>
          {products.length
            ? products.map(product => {
                return (
                  <li key={product.id}>
                    {product.name} is managed by:
                    <div>
                      <DropDownMenu
                        managerName={this.findManagerName(product, managers)}
                        managers={managers}
                        product={product}
                        productId={product.id}
                      />
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk()),
    fetchManagersThunk: () => dispatch(fetchManagersThunk())
  };
};

const mapStateToProps = state => {
  return {
    products: state.products,
    managers: state.managers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
