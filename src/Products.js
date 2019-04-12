import React, { Component } from "react";
import { connect } from "react-redux";
import DropDownMenu from "./DropDownMenu";
import { fetchProductsThunk, fetchManagersThunk } from "./store";

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
        return "none";
      }
    }
  };

  render() {
    const { products, managers } = this.props;
    products.sort(function(a, b) {
      return a - b;
    });
    managers.sort(function(a, b) {
      return a - b;
    });
    // console.log("props in Product", this.props);
    // console.log("products in Product", products);

    const listStyle = {
      listStyleType: "none",
      margin: "0",
      padding: "25px"
    };

    return (
      <div>
        <ul style={listStyle}>
          {products.map(product => {
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
          })}
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
    products: state.products || [],
    managers: state.managers || []
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
