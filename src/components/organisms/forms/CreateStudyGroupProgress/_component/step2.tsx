const T2 = () => (
  <form onSubmit={handleSubmit(handleNextStep)}>
    <InputWithLabelAndError
      {...register('max_count', {
        ...formConditions.plainText,
      })}
      // errorDisplay 타입 에러 해결 !필요!
      errorDisplay={errors?.max_count?.message || ''}
      label="스터디 그룹 최대 인원수"
    />
    <InputWithLabelAndError
      {...register('goal_date', { ...formConditions.plainText })}
      errorDisplay={errors?.goal_date?.message || ''}
      label="목표 종료 기간"
    />
    <InputWithLabelAndError
      {...register('study_detail', { ...formConditions.plainText })}
      errorDisplay={errors?.study_detail?.message || ''}
      label="스터디 그룹 상세내용"
    />
    <Button>검증</Button>
  </form>
);

export default T2;
