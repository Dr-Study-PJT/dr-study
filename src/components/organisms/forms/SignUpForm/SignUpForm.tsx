'use client';

import React, { ChangeEvent, useState } from 'react';
import { EditUserFormWrapperProps } from './SignUpForm.types';
import { Label, Input, Button, Paragraph } from '../../../atoms';
import { Form } from '@/components/molecules';
import { ButtonType } from '@/components/atoms/Input/Input.types';

// 스타일을 적용한 컴포넌트를 반환하세요.

interface fieldProps {
  emailLabel: string;
  passwordLabel: string;
  nicknameLabel: string;
  organizationLabel: string;
}

interface dataChangeProps {
  email: string;
  password: string;
  nickname: string;
  organization: string;
}

export const SignUpForm = ({ field, onSubmit }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const handleOrganizationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrganization(event.target.value);
  };

  const dataChanged: dataChangeProps = {
    email,
    password,
    nickname,
    organization,
  };

  const handleSubmit = (event: any, dataChanged: dataChangeProps) => {
    event.preventDefault();

    onSubmit(email, password, nickname, organization);
  };

  return (
    <Form onSubmit={(e: any) => handleSubmit(e, dataChanged)}>
      {/* <Form.Label text={field.emailLabel} />
      <Form.Input value={email} placeholder={field.placeholder} onChange={handleEmailChange} />

      <Form.Label text={field.passwordLabel} />
      <Form.Input value={password} placeholder={field.placeholder} onChange={handlePasswordChange} />

      <Form.Label text={field.nicknameLabel} />
      <Form.Input value={nickname} placeholder={field.placeholder} onChange={handleNicknameChange} />

      <Form.Label text={field.organizationLabel} />
      <Form.Input
        value={organization}
        placeholder={field.placeholder}
        onChange={handleOrganizationChange}
      /> */}

      <Button>제출하기</Button>
    </Form>

    // <Form onSubmit={(e: any) => handleSubmit(e, name)}>
    //   <Form.Label text={field.label} />
    //   <Form.Input value={name} placeholder={field.placeholder} onChange={handleChange} />
    //   <Form.Button type="submit">{buttonName}</Form.Button>
    // </Form>
  );
};
