const T1 = () => (
  <form onSubmit={handleSubmit(handleNextStep)}>
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
    <Button>검증</Button>
  </form>
);

export default T1;
