import React, { useState, useEffect } from 'react';
import Button from '../Common/Button';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../_actions/auth_action';

const RightMenu = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({
    auth: state.auth.auth,
  }));
  const { userInfo } = useSelector((state) => state.user);
  const [count, setCount] = useState(''); // 유저 장바구니 상품 수

  // 유저의 장바구니 상품 총 개수 구하기
  useEffect(() => {
    let total = 0;
    if (userInfo) {
      userInfo.cart.forEach((item) => (total += item.quantity));
    }
    setCount(total);
  }, [userInfo]);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!auth.isAuth) {
    return (
      <>
        <Button to='/register'>Register</Button>
        <Button to='/login'>Login</Button>
      </>
    );
  } else {
    return (
      <>
        <Button to='/product/upload'>Upload</Button>
        <Badge count={count} style={{ right: 12, top: 2 }}>
          <Button to='/user/cart'>
            <ShoppingCartOutlined style={{ fontSize: '30px' }} />
          </Button>
        </Badge>
        <Button onClick={onLogout}>Logout</Button>
      </>
    );
  }
};

export default RightMenu;
