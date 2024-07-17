// 컴포넌트 타입 작성하세요.

export interface SpanProps {
  variant: 'b1' | 'b2' | 'b3' | 'b4';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
  children: React.ReactNode;
}
