import React from "react";
import { SpanProps } from "./Span.types";

// 스타일을 적용한 컴포넌트를 반환

export const Span = ({ children }: SpanProps) => {
  return <span>{children}</span>;
};
