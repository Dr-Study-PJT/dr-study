'use client';

import React, { ChangeEvent, useState } from 'react';
import { EditUserFormWrapperProps } from './EditUserForm.types';
import { Label, Input, Button, Paragraph } from '../../../atoms';
import { Form } from '@/components/molecules';
import { ButtonType } from '@/components/atoms/Input/Input.types';

// 스타일을 적용한 컴포넌트를 반환하세요.

export const EditUserForm = ({
  field,
  buttonName = '제출하기',
  onSubmit,
}: EditUserFormWrapperProps) => {
  const [name, setName] = useState<string>(field.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any, name: any) => {
    event.preventDefault();

    // 입력 검증 추가
    if (name === '') {
      return;
    }

    onSubmit(name);
    setName('');
  };

  return (
    <Form onSubmit={(e: any) => handleSubmit(e, name)}>
      <Form.Label>라벨내용</Form.Label>
      {/* <Form.Input value={name} placeholder={field.placeholder} onChange={handleChange} /> */}
      <Form.Button type="submit">{buttonName}</Form.Button>
    </Form>
  );
};
