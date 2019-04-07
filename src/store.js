import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//action type
const GET_PRODUCTS = 'GET_PRODUCTS';

// const initialState = {
//   products: []
// };

//action creator
const setProducts = data => {
  return {
    type: GET_PRODUCTS,
    data
  };
};

//thunk
const fetchProducts = () => {
  return dispatch => {
    return axios
      .get('/products')
      .then(response => response.data)
      .then(products => dispatch(setProducts(products)));
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

// store.subscribe(() => {
//   store.getState();
// });

//subscribe, unsubscribe, dispatch, or getState
// store.dispatch({
//   type: ''
// });

export default store;
export { setProducts, fetchProducts };
