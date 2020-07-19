import React from 'react';
import Button from '../Common/Button';

const LeftMenu = () => {
  return (
    <>
      <Button to='/'>Home</Button>
      {/* 링크 추가 */}
      <Button to='/about'>About</Button>
    </>
  );
};

export default LeftMenu;
