// 컴포넌트 타입 작성하세요.

type ButtonType = 'text' | 'password' | 'email'; // 등등등 작성 !필요!

export interface FormField {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
}

export interface EditUserFormWrapperProps {
  field: FormField;
  buttonName?: string;
  onSubmit: any;
}
