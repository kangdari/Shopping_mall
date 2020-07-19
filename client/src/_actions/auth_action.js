import axios from 'axios';
import { AUTH_CHECK, LOGOUT } from './types';

export const authCheck = () => {
  const request = axios.get(`/api/users/auth`).then((res) => res.data);

  return {
    type: AUTH_CHECK,
    payload: request,
  };
};

// logout action 발생 시
// auth, user state 초기화
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  await axios.get(`/api/users/logout`);
};
