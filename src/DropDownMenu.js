import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductThunk } from './store';

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
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ revealMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  };

  buttonOptions = () => {
    const product = this.props.product;
    return this.props.managers.map(manager => (
      <button
        type="submit"
        key={manager.id}
        onClick={() => this.props.update(product, manager.id)}
      >
        {manager.name}
      </button>
    ));
  };

  render() {
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
            {this.buttonOptions()}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (prod, manId) => dispatch(updateProductThunk(prod, manId))
  };
};

// const mapStateToProps = state => {
//   return {
//     activeManagers: state.activeManagers
//   };
// };

export default connect(
  null,
  mapDispatchToProps
)(DropDownMenu);
