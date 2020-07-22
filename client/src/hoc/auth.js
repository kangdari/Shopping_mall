import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from '../_actions/auth_action';

export default (SpecificComponent, option, adminRoute = null) => {
  // option
  // null: 아무나 출입 가능
  // true: login 유저만 출입 가능
  // false: login 유저 출입 불가

  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.auth);
    const user = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(authCheck()).then((res) => {
        // 로그인 x 상태
        if (!res.payload.isAuth) {
          if (option) {
            // 로그인이 되지 않은 상태에서 로그인이 필요한 페이지 접근 시 login 페이지 이동
            props.history.push('/login');
          }
        } else {
          // 로그인 o 상태
          if (adminRoute && !res.payload.isAdmin) {
            // 관리자 사이트에 접근, 로그인 사용자가 관리자가 아닐 때 home으로 이동
            props.history.push('/');
          } else if (option === false) {
            // 로그인 유저 출입이 안되는 곳 접근 시 home으로 이동
            props.history.push('/');
          }
        }
      });
    }, [props.history, dispatch]);
    // 컴포넌트를 반환
    return <SpecificComponent {...props} auth={auth} user={user} />;
  };

  return AuthenticationCheck;
};
