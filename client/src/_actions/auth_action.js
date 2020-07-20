import axios from 'axios';
import { AUTH_CHECK, LOGOUT } from './types';
import { USER_SERVER } from '../utils/serverRoute';

export const authCheck = () => {
  const request = axios.get(`${USER_SERVER}/auth`).then((res) => res.data);

  return {
    type: AUTH_CHECK,
    payload: request,
  };
};

// logout action 발생 시
// auth, user state 초기화
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  await axios.get(`${USER_SERVER}/logout`);
};
