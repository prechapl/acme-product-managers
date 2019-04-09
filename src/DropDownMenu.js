import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateProductThunk,
  fetchProductsThunk,
  fetchProductThunk
} from "./store";

class DropDownMenu extends Component {
  constructor() {
    super();
    this.state = {
      revealMenu: false
    };
  }

  revealMenu = event => {
    event.preventDefault();
    this.setState({ revealMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ revealMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  renderOptions = () => {
    const product = this.props.product;
    // const managerIdx = this.props.managerId;
    return this.props.managers.map(manager => (
      <button
        type="submit"
        key={manager.id}
        // onClick={() => console.log(product, manager.id)}
        onClick={() => this.props.update(product, manager.id)}
      >
        {manager.name}
      </button>
    ));
  };

  render() {
    // console.log('this.state.product', this.state.product);

    // const produ = this.props.fetchProd(productId);
    return (
      <div>
        <button type="submit" onClick={this.revealMenu}>
          {this.props.managerName}
        </button>

        {this.state.revealMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {this.renderOptions()}
          </div>
        ) : null}
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     product: state.products
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    // // fetchProds: () => dispatch(fetchProductsThunk()),
    // fetchProd: id => dispatch(fetchProductThunk(id)),
    update: (prod, manId) => dispatch(updateProductThunk(prod, manId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DropDownMenu);

// export default DropDownMenu;
