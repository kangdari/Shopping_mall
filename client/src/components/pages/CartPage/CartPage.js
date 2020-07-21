import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartProducts } from '../../../_actions/user_action';

const CartPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  // Product 콜랙션의 정보 + User 콜렉션의 quantity 해야함

  // 리덕스 user state의 cart 확인
  useEffect(() => {
    const cartItems = [];
    if (userInfo && userInfo.cart) {
      // cart안에 product가 있는지 확인
      if (userInfo.cart.length > 0) {
        // 있으면 상품의 id 배열에 저장
        userInfo.cart.forEach((product) => cartItems.push(product.id));
      }
      // cart안의 상품 정보,
      dispatch(getCartProducts(cartItems, userInfo.cart));
    }
  }, [userInfo, dispatch]);
  return <div>CartPage</div>;
};

export default CartPage;
