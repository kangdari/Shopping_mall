import axios from 'axios';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILUER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILUER,
  ADD_TO_CART,
  GET_CART_PRODUCTS,
  REMOVE_CART_ITEM,
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../utils/serverRoute';

export const loginUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });

  try {
    const res = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAILUER,
      payload: err,
    });
  }
};

export const registerUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  try {
    const res = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILUER,
      payload: err,
    });
  }
};

export const addToCart = (id) => {
  const body = {
    productId: id,
  };

  const request = axios.post(`${USER_SERVER}/addToCart`, body).then((res) => res.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
};

// CartPage: 서버에서 여러개의 Product 정보 가져오기
// cartItems : Product 컬렉션의 상세 정보
// userCartInfo: User 컬렉션 중 cart 정보
export const getCartProducts = (cartItems, userCartInfo) => {
  // 여러개의 Product 정보를 가져오므로 type=array
  const request = axios
    .get(`${PRODUCT_SERVER}/product_id?productId=${cartItems}&type=array`)
    .then((res) => {
      // cartItem에 해당하는 정보들을 Product 컬렉션에서 가져와
      // User 컬렉션의 cart.quantity 정보를 넣어준다
      userCartInfo.forEach((userCartItem) => {
        res.data.productInfo.forEach((productDetail, index) => {
          // Product의 id와 userCartItem id가 같은지 확인
          // 즉, 서로 같은 상품인지 확인하여 같으면 quantity 추가
          if (userCartItem.id === productDetail._id) {
            res.data.productInfo[index].quantity = userCartItem.quantity;
          }
        });
      });
      // reducer에 전달
      return res.data.productInfo;
    });

  return {
    type: GET_CART_PRODUCTS,
    payload: request,
  };
};

// 장바구니에서 선택한 상품 삭제
export const removeCartItem = (productId) => {
  const request = axios.get(`${USER_SERVER}/removeFromCart?productId=${productId}`).then((res) => {
    // res.data.cartInfo : 장바구니 상품의 정보 (id, qunatity, data )
    // productDetailInfo => productInfo + cartInfo의 상품 quantity 정보 추가
    res.data.cartInfo.forEach((cartItem) => {
      res.data.productInfo.forEach((product, index) => {
        if (product._id === cartItem.id) {
          res.data.productInfo[index].quantity = cartItem.quantity;
        }
      });
    });
    return res.data;
  });

  // 리듀서 상태 업데이트
  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
};
