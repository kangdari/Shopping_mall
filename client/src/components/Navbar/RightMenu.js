import React from 'react';
import Button from '../Common/Button';

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
        <Button onClick={onLogout}>Logout</Button>
      </>
    );
  }
};

export default RightMenu;
