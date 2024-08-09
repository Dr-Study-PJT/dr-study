export interface GroupValidationErrors {
    name?: string;
    description?: string;
    memberCapacity?: string;
    dueDate?: string;
}

export const validateGroupName = (name: string): string | undefined => {
    if (!name) return '스터디 그룹명을 입력해주세요.';
    if (name.length < 3) return '스터디 그룹명은 최소 3자 이상이어야 합니다.';
    return undefined;
};

export const validateGroupDescription = (
    description: string,
): string | undefined => {
    if (!description) return '스터디 그룹 설명을 입력해주세요.';
    if (description.length < 10)
        return '스터디 그룹 설명은 최소 10자 이상이어야 합니다.';
    return undefined;
};

export const validateGroupCapacity = (capacity: number): string | undefined => {
    if (!capacity) return '스터디 그룹 최대 인원수를 입력해주세요.';
    if (capacity <= 0)
        return '스터디 그룹 최대 인원수는 1명 이상이어야 합니다.';
    return undefined;
};

export const validateGroupDueDate = (dueDate: Date): string | undefined => {
    if (!dueDate) return '목표 종료 기간을 선택해주세요.';
    return undefined;
};

export const validateGroupForm = (data: any): GroupValidationErrors => {
    const errors: GroupValidationErrors = {};

    errors.name = validateGroupName(data.name);
    errors.description = validateGroupDescription(data.description);
    errors.memberCapacity = validateGroupCapacity(data.memberCapacity);
    errors.dueDate = validateGroupDueDate(data.dueDate);

    return errors;
};
