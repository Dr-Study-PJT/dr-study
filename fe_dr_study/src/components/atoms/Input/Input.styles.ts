// import { background } from "styled-system";

// 스타일 토큰 작성

// StyledInput.tsx
// import styled from "styled-components";
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
}

// const StyledInput = styled.input<InputProps>`
//   border: 2px solid ${(props) => props.borderColor || '#ccc'};
//   border-radius: ${(props) => props.borderRadius || '4px'};
//   padding: ${(props) => props.padding || '8px'};
//   font-size: 16px;
//   width: 100%;
//   box-sizing: border-box;

//   &:focus {
//     border-color: ${(props) => props.borderColor || '#007BFF'};
//     outline: none;
//   }
// `;

// export default StyledInput;
