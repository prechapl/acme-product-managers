const sequelize = require('sequelize');
const conn = require('./index');

const User = conn.define('user', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
});

const Product = conn.define('product', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
});

Product.belongsTo(User, { as: 'manager' });
User.hasMany(Product);

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    return Promise.all([
      User.create({ name: 'Moe' }),
      User.create({ name: 'Larry' }),
      User.create({ name: 'Curly' }),
      Product.create({ name: 'Foo', managerId: 3 }),
      Product.create({ name: 'Bar', managerId: 2 }),
      Product.create({ name: 'Baz', managerId: 3 })
    ]);
  });
};

module.exports = {
  User,
  Product,
  syncAndSeed
};
