'use client';

// 스타일을 적용한 컴포넌트를 반환하세요.

import { SubmitHandler, useForm } from 'react-hook-form';

import formConditions from '@/constants/formConditions';

import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { Button } from '@/components/atoms';

type Inputs = {
  email: string;
  nickname: string;
  age: string;
  organization: string;
  password: string;
};

export const ExampleFormOrganism = () => {
  // 1. useForm 함수를 실행하면
  const {
    register, // field 등록
    handleSubmit, // form 에서 submit 수행 될 때 실행할 함수를 인자로 전달
    formState: { errors }, // error 메시지를 다루기 위한 것
  } = useForm<Inputs>();

  // submit시 input에 작성된 내용들을 확인할 수 있음
  // handleSubmit의 인자로 수행할 함수 넘기면 됨
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // watch로 현재 input에 입력되고 있는 상태를 확인할 수 있음
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabelAndError
        {...register('email', { ...formConditions.email })}
        errorDisplay={errors?.email?.message || ''}
        label="이메일"
      />
      <InputWithLabelAndError
        {...register('nickname', { ...formConditions.nickname })}
        errorDisplay={errors?.nickname?.message || ''}
        label="닉네임"
      />
      <InputWithLabelAndError
        {...register('age', { ...formConditions.age })}
        errorDisplay={errors?.age?.message || ''}
        label="나이"
      />
      <InputWithLabelAndError
        {...register('organization', { ...formConditions.organization })}
        errorDisplay={errors?.organization?.message || ''}
        label="조직"
      />
      <InputWithLabelAndError
        {...register('password', { ...formConditions.password })}
        errorDisplay={errors?.password?.message || ''}
        label="비밀번호"
      />
      {/* errors will return when field validation fails  */}
      <Button>제출하기</Button>
    </form>
  );
};
