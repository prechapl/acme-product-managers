import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//action types
const GET_PRODUCTS = 'GET_PRODUCTS';
// const GET_PRODUCT = 'GET_PRODUCT';
const GET_MANAGERS = 'GET_MANAGERS';
const GET_ACTIVE_MANAGERS = 'GET_ACTIVE_MANAGERS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//action creators
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  };
};
// const getProduct = product => {
//   return {
//     type: GET_PRODUCT,
//     product
//   };
// };

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

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  };
};

//reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT:
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
      .then(() => dispatch(updateProduct(updatedProduct)));
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

//create store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
