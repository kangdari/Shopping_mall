import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { authCheck } from '../../../_actions/auth_action';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo, userError, auth } = useSelector((state) => ({
    userInfo: state.user.userInfo,
    userError: state.user.userError,
    auth: state.auth.auth,
  }));
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 오류 처리
  useEffect(() => {
    if (userError) {
      if (userError.response.status === 401) {
        // 서버 예외 처리 오류 message
        setError(userError.response.data.message);
        // setError('id 또는 비밀번호가 틀렸습니다.');
        return;
      } else {
        setError('로그인 오류');
        return;
      }
    }
  }, [userError]);

  // 로그인 성공 처리
  useEffect(() => {
    if (userInfo.loginSuccess) {
      history.push('/');
    }
  }, [history, userInfo.loginSuccess, auth.isAuth]);

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    if ([id, password].includes('')) {
      setError('빈 칸을 입력하세요.');
      return;
    }
    dispatch(loginUser({ id, password }));
    dispatch(authCheck());
  };

  return (
    <LoginContainer>
      <form className='loginForm' onSubmit={onSumbitHandler}>
        <label>Id</label>
        <input type='id' value={id} onChange={onIdHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        {error ? <div>{error}</div> : ''}
        <button type='sumbit'>Login</button>
      </form>
    </LoginContainer>
  );
};

export default withRouter(LoginPage);

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginForm {
    display: flex;
    flex-direction: column;
  }
`;
