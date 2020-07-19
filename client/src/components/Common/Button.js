import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../utils/palette';

const buttonStyle = css`
  border: none;
  outline: none;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  background: white;

  &:hover {
    color: ${palette.gray[5]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover: {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

// to props가 존재하면 Link 컴포넌트
// 존재하지 않으면 button 컴포넌트
const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
