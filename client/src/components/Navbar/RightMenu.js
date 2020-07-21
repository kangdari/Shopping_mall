import React, { useEffect, useState } from 'react';
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
        <Badge count={5} style={{ right: 12, top: 2 }}>
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
