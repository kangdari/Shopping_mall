import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCardBlock from './Sections/UserCardBlock';
import { removeCartItem, successBuy, getCartProducts } from '../../../_actions/user_action';
import { Empty, Result } from 'antd';
import Paypal from '../../Common/Paypal';

const CartPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartDeatilInfo = useSelector((state) => state.user.cartDeatilInfo);
  const [price, setPrice] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Product 콜랙션의 정보 + User 콜렉션의 quantity 해야함
  // 리덕스 user state의 cart 확인
  useEffect(() => {
    const cartItems = [];
    // cart안에 product가 있는지 확인
    if (userInfo && userInfo.cart.length !== 0) {
      // 있으면 상품의 id 배열에 저장
      userInfo.cart.forEach((product) => cartItems.push(product.id));
      // cart안의 상품 정보,
      dispatch(getCartProducts(cartItems, userInfo.cart)).then((res) => getTotalPrice(res.payload));
    }
  }, [userInfo, dispatch, showPrice]);

  // 장바구니 총액 구하기
  const getTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      // price = price * qunatity
      totalPrice += product.price * product.quantity;
    });
    setPrice(totalPrice);
    setShowPrice(true);
  };

  // 장바구니 상품 제거 버튼
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((res) => {
      // 장바구니가 비었다면
      if (res.payload.productInfo.length <= 0) {
        setShowPrice(false);
      }
    });
  };

  // paypal 구매 성공
  const paypalSuccess = (data) => {
    dispatch(
      successBuy({
        paymentData: data, // 결제 성공 데이터
        cartDeatilInfo: cartDeatilInfo, // 카트 안의 데이터
      })
    ).then((res) => {
      setShowSuccess(true); // 구매 성공 메시지 출력
    });
  };

  return (
    <div style={{ width: '85%', margin: ' 3rem auto' }}>
      <h1>My Cart</h1>
      {/* 장바구니 상품 목록 */}
      <UserCardBlock products={cartDeatilInfo} removeFromCart={removeFromCart} />
      {showSuccess ? (
        <Result status='success' title='Successfully Purchased Items!' />
      ) : showPrice ? (
        <div style={{ marginTop: '3rem' }}>
          <span style={{ fontSize: '20px' }}>Total Amount: ${price}</span>
          <Paypal onSuccess={paypalSuccess} price={price} />
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <Empty />
          <span>No Item In the Cart</span>
        </div>
      )}
    </div>

    // <div style={{ width: '85%', margin: ' 3rem auto' }}>
    //   <h1>My Cart</h1>
    //   {/* 장바구니 상품 목록 */}
    //   <UserCardBlock products={cartDeatilInfo} removeFromCart={removeFromCart} />
    //   {showPrice ? (
    //     <div style={{ marginTop: '3rem' }}>
    //       <span style={{ fontSize: '20px' }}>Total Amount: ${price}</span>
    //     </div>
    //   ) : showSuccess ? (
    //     <Result status='success' title='Successfully Purchased Items!' />
    //   ) : (
    //     <div style={{ marginTop: '2rem' }}>
    //       <Empty />
    //       <span>No Item In the Cart</span>
    //     </div>
    //   )}
    //   {showPrice ? <Paypal onSuccess={paypalSuccess} price={price} /> : null}
    // </div>
  );
};

export default CartPage;
