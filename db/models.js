const sequelize = require('sequelize');
const conn = require('./index');

const User = conn.define('user', {
  name: sequelize.STRING
});

const Product = conn.define('product', {
  name: sequelize.STRING
});

Product.belongsTo(User, { as: 'manager' });
User.hasMany(Product);

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'Moe' }),
        User.create({ name: 'Larry' }),
        User.create({ name: 'Curly' })
      ]);
    })
    .then(users => {
      const toBeProducts = [
        { name: 'Foo', managerId: 3 },
        { name: 'Bar', managerId: 2 },
        { name: 'Baz', managerId: 3 }
      ];
      return Promise.all(
        users.map((user, i) => {
          return Product.create({ ...toBeProducts[i], managerId: user.id });
        })
      ).catch(e => {
        throw e;
      });
    });
};

module.exports = {
  User,
  Product,
  syncAndSeed
};
