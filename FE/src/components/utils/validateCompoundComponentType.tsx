import React, { ReactNode, isValidElement } from 'react';

import { Label, Input } from '../atoms';

// 유효한 자식 요소인지 확인하는 함수
const isValidChild = (child: ReactNode) => {
  return (
    isValidElement(child) && (child.type === Label || child.type === Input)
    // (child.type === Label || child.type === Input || child.type === Button)
  );
};

// 자식 요소를 검증하고 잘못된 요소를 처리하는 함수
const renderChildren = (children: ReactNode) => {
  return React.Children.map(children, (child) => {
    let wrongTypeTag;
    if (isValidElement(child) && typeof child.type === 'string') {
      wrongTypeTag = child.type;
    }
    return isValidChild(child) ? (
      child
    ) : (
      <span style={{ color: 'red', fontSize: '3rem' }}>
        태그 잘못썼어(!!!{wrongTypeTag}!!!)
      </span>
    );
  });
};
