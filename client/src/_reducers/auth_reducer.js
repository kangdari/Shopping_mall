import { handleActions } from 'redux-actions';
import { AUTH_CHECK, LOGOUT, ADD_TO_CART } from '../_actions/types';

const initialState = {
  auth: '',
};

const auth = handleActions(
  {
    [AUTH_CHECK]: (state, action) => ({
      ...state,
      auth: action.payload,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: {
        isAuth: '',
      },
    }),
    [ADD_TO_CART]: (state, action) => ({
      ...state,
      auth: {
        ...state.auth,
        cart: action.payload,
      },
    }),
  },
  initialState
);

export default auth;
