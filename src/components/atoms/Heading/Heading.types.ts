// 컴포넌트 타입 작성하세요.

export interface HeadingProps {
  variant: 'h2' | 'h3' | 'h4';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
  children: React.ReactNode;
}
