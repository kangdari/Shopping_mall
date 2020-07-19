import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo, userError } = useSelector((state) => ({
    userInfo: state.user.userInfo,
    userError: state.user.userError,
  }));

  // 회원가입 성공 시 login 이동
  useEffect(() => {
    if (userInfo.registerSuccess) {
      history.push('/login');
    }
  }, [userInfo.registerSuccess, history]);

  // 회원가입 오류
  useEffect(() => {
    if (userError && userError.response.status === 409) {
      // id 중복
      setError(userError.response.data.message);
      return;
    }
  }, [userError]);

  const IdHandler = (e) => {
    setId(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();

    if ([password, confirmPassword, id].includes('')) {
      setError('빈칸을 입력하세요');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 서로 다릅니다');
      return;
    }

    dispatch(registerUser({ id, name, password, confirmPassword }));
  };

  return (
    <ReisgerContainer>
      <form className='registerForm' onSubmit={onSumbitHandler}>
        <label>Id</label>
        <input type='id' name='id' value={id} onChange={IdHandler} />
        <label>name</label>
        <input type='text' name='name' value={name} onChange={nameHandler} />
        <label>password</label>
        <input type='password' name='password' value={password} onChange={passwordHandler} />
        <label>confirmPassword</label>
        <input
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={confirmPasswordHandler}
        />
        {error ? <div>{error}</div> : ''}

        <button type='submit'>Register</button>
      </form>
    </ReisgerContainer>
  );
};

export default withRouter(RegisterPage);

const ReisgerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .registerForm {
    display: flex;
    flex-direction: column;
  }
`;
