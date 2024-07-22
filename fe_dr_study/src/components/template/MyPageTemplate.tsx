import { ButtonType } from '../atoms/Input/Input.types';

interface MyPageTemplateProps {
  user: {
    name: string;
    email: string;
  };
  updateUserName: (newName: string) => void;
}

export interface FieldProps {
  label: string;
  type?: ButtonType;
  placeholder?: string;
  name: string;
}

const MyPageTemplate: React.FC<MyPageTemplateProps> = ({
  user,
  updateUserName,
}) => {
  const field: FieldProps = {
    label: '닉네임 입력하세요.',
    placeholder: '여기 클릭하고 입력하면 됩니다.',
    name: user.name,
  };

  return (
    <div>
      <h1>My Page</h1>
    </div>
  );
};

export default MyPageTemplate;
