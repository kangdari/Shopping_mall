import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Landingpage = () => {
  useEffect(() => {
    // DB의 모든 상품 정보 가져오기
    axios.post('/api/product/products').then((res) => {
      if (res.data.success) {
        alert('상품 가져오기 성공');
        console.log(res.data.productsInfo);
      } else {
        alert('상품 불러오기 실패');
      }
    });
  }, []);

  return (
    <>
      <LandingCondtainer>
        <h2>Landingpage</h2>
      </LandingCondtainer>
    </>
  );
};

const LandingCondtainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Landingpage;
