import { handleActions } from 'redux-actions';
import { AUTH_CHECK, LOGOUT } from '../_actions/types';

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
  },
  initialState
);

export default auth;
