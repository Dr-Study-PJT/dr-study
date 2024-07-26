interface fieldProps {
  emailLabel: string;
  passwordLabel: string;
  nicknameLabel: string;
  organizationLabel: string;
}

const SignUpTemplate: React.FC = () => {
  const field = {
    emailLabel: "email",
    passwordLabel: "password",
    nicknameLabel: "nickname",
    organizationLabel: "organization",
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
    </div>
  );
};

export default SignUpTemplate;
