import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartProducts } from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import { removeCartItem } from '../../../_actions/user_action';

const CartPage = (user) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartDeatilInfo = useSelector((state) => state.user.cartDeatilInfo);
  const [price, setPrice] = useState(0);

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
      dispatch(getCartProducts(cartItems, userInfo.cart)).then((res) => getTotalPrice(res.payload));
    }
  }, [userInfo, dispatch]);

  // 장바구니 총액 구하기
  const getTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      // price = price * qunatity
      totalPrice += product.price * product.quantity;
    });
    setPrice(totalPrice);
  };

  // 장바구니 상품 제거 버튼
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((res) => {
      console.log(res);
    });
  };

  return (
    <div style={{ width: '85%', margin: ' 3rem auto' }}>
      <h1>My Cart</h1>
      {/* 장바구니 상품 목록 */}
      <UserCardBlock products={cartDeatilInfo} removeFromCart={removeFromCart} />
      <div style={{ marginTop: '3rem' }}>
        <span style={{ fontSize: '20px' }}>Total Amount: ${price}</span>
      </div>
    </div>
  );
};

// 삭제 버튼을 누르면 id에 해당하는 상품을 db에서 삭제

// 1. User 컬렉션에서  user.cart에서 해당하는 id의 상품을 제거

export default CartPage;
