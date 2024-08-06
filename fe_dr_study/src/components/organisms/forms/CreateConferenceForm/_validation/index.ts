export interface ValidationErrors {
    title?: string;
    subject?: string;
    memberCapacity?: string;
}

export const validateTitle = (title: string): string | undefined => {
    if (!title) return '컨퍼런스 제목을 입력해주세요.';
    return undefined;
};

export const validateSubject = (subject: string): string | undefined => {
    if (!subject) return '컨퍼런스 주제를 입력해주세요.';
    if (subject.length < 5)
        return '컨퍼런스 주제는 최소 5자 이상이어야 합니다.';
    return undefined;
};

export const validateMemberCapacity = (
    memberCapacity: string,
): string | undefined => {
    if (!memberCapacity) return '컨퍼런스에 참여할 최대 인원을 입력해주세요.';
    if (parseInt(memberCapacity) < 1)
        return '컨퍼런스에는 최소 1명 이상 참여하여야 합니다.';
    if (parseInt(memberCapacity) > 16) return '최대 참여 인원은 16명 입니다.';

    return undefined;
};

export const validateForm = (data: any): ValidationErrors => {
    const errors: ValidationErrors = {};

    errors.title = validateTitle(data.title);
    errors.subject = validateSubject(data.subject);
    errors.memberCapacity = validateMemberCapacity(data.memberCapacity);

    return errors;
};
