import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  managers: []
};
//action type
const GET_PRODUCTS = 'GET_PRODUCTS';

//action creator
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  };
};

//thunk
export const fetchProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(getProducts(products)));
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
// export { fetchProducts };
