import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// const initialState = {
//   products: [],
//   managers: []
// };

//action types
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_MANAGERS = 'GET_MANAGERS';
const GET_ACTIVE_MANAGERS = 'GET_ACTIVE_MANAGERS';

//action creators
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  };
};

const getManagers = managers => {
  return {
    type: GET_MANAGERS,
    managers
  };
};
const getActiveManagers = activeManagers => {
  return {
    type: GET_ACTIVE_MANAGERS,
    activeManagers
  };
};

//reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const managersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MANAGERS:
      return action.managers;
    default:
      return state;
  }
};

const activeManagersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ACTIVE_MANAGERS:
      return action.activeManagers;
    default:
      return state;
  }
};

const reducer = combineReducers({
  products: productsReducer,
  managers: managersReducer,
  activeManagers: activeManagersReducer
});

//thunks
export const fetchProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(getProducts(products)));
  };
};
export const fetchManagersThunk = () => {
  return dispatch => {
    return axios
      .get('/api/managers')
      .then(response => response.data)
      .then(managers => dispatch(getManagers(managers)));
  };
};

export const updateProductThunk = (product, managerId) => {
  const updatedProduct = {
    id: product.id,
    name: product.name,
    managerId: managerId
  };
  return dispatch => {
    return axios
      .put(`/api/products/${updatedProduct.id}`, updatedProduct)
      .then(() => dispatch(fetchProductsThunk()));
  };
};

export const activeManagersThunk = () => {
  return dispatch => {
    return Promise.all([axios.get('/api/products'), axios.get('/api/managers')])
      .then(res => {
        const products = res[0].data;
        const managers = res[1].data;
        const uniqueManagerIds = products.reduce((manIds, product) => {
          if (product.managerId && !manIds.includes(product.managerId)) {
            manIds.push(product.managerId);
          }
          return manIds;
        }, []);
        return managers.filter(manager =>
          uniqueManagerIds.includes(manager.id));
      })
      .then(actingManagers => dispatch(getActiveManagers(actingManagers)));
  };
};
// const activeManagers = state => {
//   const products = state.products;
//   const managers = state.managers;
//   console.log('products in activeManagers', products);
//   if (state.products !== undefined) {
//     const uniqueManagerIds = state.products.reduce((manIds, product) => {
//       if (product.managerId && !manIds.includes(product.managerId)) {
//         manIds.push(product.managerId);
//       }
//       return manIds;
//     }, []);

//     const active = state.managers.filter(manager =>
//       uniqueManagerIds.includes(manager.id));
//     return active;
//   }
// };

//create store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

// export { activeManagers };
