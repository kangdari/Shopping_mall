import React from 'react';
import styled from 'styled-components';

const Landingpage = () => {
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
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Landingpage;
