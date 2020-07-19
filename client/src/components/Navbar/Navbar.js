import React from 'react';
import styled from 'styled-components';
import palette from '../../utils/palette';

import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';

const Navbar = () => {
  return (
    <NavbarBlock>
      <div className='navbar'>
        <h2 className='logo'>Logo</h2>
        <div className='left_menu'>
          <LeftMenu />
        </div>
        <div className='right_menu'>
          <RightMenu />
        </div>
      </div>
    </NavbarBlock>
  );
};

const NavbarBlock = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  padding: 10px 0;
  border-bottom: 1px solid ${palette.gray[3]};
  background: #fff;

  .navbar {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 40px;
  }

  .right_menu {
    margin-left: auto;
  }
`;

export default Navbar;
