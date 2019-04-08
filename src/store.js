import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  managers: []
};

//action types
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_MANAGERS = 'GET_MANAGERS';

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

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    case GET_MANAGERS:
      return { ...state, managers: action.managers };
    default:
      return state;
  }
};

//create store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
