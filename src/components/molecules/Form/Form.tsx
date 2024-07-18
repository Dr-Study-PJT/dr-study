// Form.tsx
import React, { ReactNode, isValidElement } from 'react';
import { FormWrapperProps } from './Form.types';
import { Label, Input, Button } from '../../atoms';

export const Form = ({ onSubmit, children }: FormWrapperProps) => {
  // 타입이 일치하는지 검증 하는 함수 모듈화 하기 !필요!
  // const isValidChild = (child: ReactNode) => {
  //   return (
  //     isValidElement(child) && (child.type === Label || child.type === Input || child.type === Button)
  //   );
  // };

  // {children.map((child) => {
  //   let wrongTypeTag;
  //   if (typeof child.type === "string") {
  //     wrongTypeTag = child.type;
  //   }
  //   return isValidChild(child) ? (
  //     child
  //   ) : (
  //     <span style={{ color: "red", fontSize: "3rem" }}>태그 잘못썼어(!!!{wrongTypeTag}!!!)</span>
  //   );
  // })}

  return <form onSubmit={onSubmit}>{children}</form>;
};

Form.Label = Label;
Form.Input = Input;
Form.Button = Button;
