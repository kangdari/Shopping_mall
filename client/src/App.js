import React from 'react';
import GlobalStyle from './GlobalStyle';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage/Landingpage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import UploadProductPage from './components/pages/UploadProductPage/UploadProductPage';

import NavBar from './components/Navbar/Navbar';

import Auth from './hoc/auth';

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      {/* NavBar 높이만큼 패딩 값 설정 */}
      <div style={{ paddingTop: '61px' }}>
        <Switch>
          <Route path='/' component={Auth(LandingPage, null)} exact />
          <Route path='/login' component={Auth(LoginPage, false)} exact />
          <Route path='/register' component={Auth(RegisterPage, false)} exact />
          <Route path='/product/upload' component={Auth(UploadProductPage, true)} exact />
        </Switch>
      </div>
    </>
  );
}

export default App;
