export const handleKeyDownForNextInput = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  target: string,
  setFocus: (target: string) => any,
) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // 기본 엔터 동작 방지
    setFocus(target);
  }
};

export const handleKeyDownForSubmit = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  handleSubmit: () => void,
) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // 기본 엔터 동작 방지
    handleSubmit();
  }
};
