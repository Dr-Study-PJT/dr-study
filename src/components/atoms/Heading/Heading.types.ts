// 컴포넌트 타입 작성하세요.

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
}
