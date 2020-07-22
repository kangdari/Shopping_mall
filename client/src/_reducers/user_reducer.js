import { handleActions } from 'redux-actions';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILUER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILUER,
  LOGOUT,
  ADD_TO_CART,
  AUTH_CHECK,
  GET_CART_PRODUCTS,
  REMOVE_CART_ITEM,
} from '../_actions/types';

const initialState = {
  userError: '', // 에러
  userInfo: '', // 로그인, 회원가입 성공 여부
  cartDeatilInfo: '',
};

const user = handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, action) => ({
      ...state,
      userInfo: action.payload,
      userError: '',
    }),
    [LOGIN_USER_FAILUER]: (state, action) => ({
      ...state,
      userInfo: '',
      userError: action.payload,
    }),
    [REGISTER_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      userInfo: payload,
      userError: '',
    }),
    [REGISTER_USER_FAILUER]: (state, action) => ({
      ...state,
      userError: action.payload,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      userInfo: '',
    }),
    [ADD_TO_CART]: (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        cart: action.payload,
      },
    }),
    [GET_CART_PRODUCTS]: (state, action) => ({
      ...state,
      cartDeatilInfo: action.payload,
    }),
    [REMOVE_CART_ITEM]: (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        cart: action.payload.cartInfo,
      },
      // productInfo = cartInfo + user의 cart quantity
      cartDeatilInfo: action.payload.productInfo,
    }),
    // AUTH_CHECK 액션 발생 시 user 상태도 업데이트
    [AUTH_CHECK]: (state, action) => ({
      ...state,
      userInfo: action.payload,
    }),
  },
  initialState
);

export default user;
