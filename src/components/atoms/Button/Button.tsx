// import React from "react";
// import { BasicButton } from "./Button.styles";
import { ButtonProps } from './Button.types';

export const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

// export const Button = ({
//   children,
//   size = "md",
//   color = "primary",
//   variant = "contained",
//   disabled = false,
//   fullwidth = "false",
//   ...props
// }: ButtonProps) => {
//   return (
//     <BasicButton
//       variant={variant}
//       size={size}
//       color={color}
//       disabled={disabled}
//       fullwidth={fullwidth}
//       {...props}
//     >
//       {children}
//     </BasicButton>
//   );
// };
