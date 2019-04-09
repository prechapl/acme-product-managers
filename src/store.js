import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";
// const GET_PRODUCT = 'GET_PRODUCT';
const GET_MANAGERS = "GET_MANAGERS";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

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

const reducer = combineReducers({
  managers: managersReducer,
  products: productsReducer
});

//thunks
const fetchProductsThunk = () => {
  return dispatch => {
    return axios
      .get("/api/products")
      .then(response => response.data)
      .then(products => dispatch(getProducts(products)));
  };
};
export const fetchManagersThunk = () => {
  return dispatch => {
    return axios
      .get("/api/managers")
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

// export const fetchProductThunk = prodId => {
//   return dispatch => {
//     return axios
//       .get(`/api/products/${prodId}`)
//       .then(response => response.data)
//       .then(product => dispatch(getProduct(product)));
//   };
// };

//create store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { fetchProductsThunk };
