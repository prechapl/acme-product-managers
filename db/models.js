const conn = require("./index");

const User = conn.define("user", {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
});

const Product = conn.define("product", {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
});

module.exports = {
  User,
  Product
};
