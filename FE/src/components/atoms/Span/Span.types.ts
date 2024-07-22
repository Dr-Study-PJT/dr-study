// 컴포넌트 타입 작성하세요.

export interface SpanProps {
  customized?: any //타입작성 !필요!
  variant?: 's1' | 'b1' | 'b2' | 'b3' | 'b4';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
  children: React.ReactNode;
  className?: string;
}
