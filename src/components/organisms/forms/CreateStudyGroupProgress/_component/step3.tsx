const T3 = () => (
  <form onSubmit={handleSubmit((data) => console.log(data))}>
    <ImageUpload
      bodyData={bodyData}
      setBodyData={setBodyData}
      setImageDisplay={setImageDisplay}
    />
    {imageDisplay && (
      <div className="w-28 h-28">
        <Image
          width={100}
          height={100}
          src={imageDisplay}
          alt="Uploaded"
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <InputWithLabelAndError
      {...register('study_group_name', {
        ...formConditions.plainText,
      })}
      // errorDisplay 타입 에러 해결 !필요!
      errorDisplay={errors?.study_group_name?.message || ''}
      label="스터디 그룹명"
    />
    <InputWithLabelAndError
      {...register('study_goal', { ...formConditions.plainText })}
      errorDisplay={errors?.study_goal?.message || ''}
      label="스터디 목표"
    />
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
  </form>
);

export default T3;
