import React from 'react';
// import GlobalStyle from './GlobalStyle';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage/Landingpage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import UploadProductPage from './components/pages/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/pages/DetailProuctPage/DetailProductPage';
import CartPage from './components/pages/CartPage/CartPage';

import NavBar from './components/Navbar/Navbar';

import Auth from './hoc/auth';

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <NavBar />
      {/* NavBar 높이만큼 패딩 값 설정 */}
      <div style={{ paddingTop: '61px' }}>
        <Switch>
          <Route path='/' component={Auth(LandingPage, null)} exact />
          <Route path='/login' component={Auth(LoginPage, false)} />
          <Route path='/register' component={Auth(RegisterPage, false)} />
          <Route path='/product/upload' component={Auth(UploadProductPage, true)} />
          <Route path='/product/:productId' component={Auth(DetailProductPage, null)} />
          <Route path='/user/cart' component={Auth(CartPage, true)} />
        </Switch>
      </div>
    </>
  );
}

export default App;
