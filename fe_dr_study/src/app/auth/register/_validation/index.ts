export interface ValidationErrors {
    email?: string;
    nickname?: string;
    password?: string;
    rePassword?: string;
}

export const validateEmail = (email: string): string | undefined => {
    if (!email) return '이메일을 입력해주세요.';
    if (!/\S+@\S+\.\S+/.test(email))
        return '유효한 이메일 주소를 입력해주세요.';
    return undefined;
};

export const validateNickname = (nickname: string): string | undefined => {
    if (!nickname) return '닉네임을 입력해주세요.';
    if (nickname.length < 3) return '닉네임은 최소 3자 이상이어야 합니다.';
    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password) return '비밀번호를 입력해주세요.';
    if (password.length < 6) return '비밀번호는 최소 6자 이상이어야 합니다.';
    return undefined;
};

export const validateRePassword = (
    password: string,
    rePassword: string,
): string | undefined => {
    if (!rePassword) return '비밀번호 확인을 입력해주세요.';
    if (password !== rePassword) return '비밀번호가 일치하지 않습니다.';
    return undefined;
};

export const validateForm = (data: any): ValidationErrors => {
    const errors: ValidationErrors = {};

    errors.email = validateEmail(data.email);
    errors.nickname = validateNickname(data.nickname);
    errors.password = validatePassword(data.password);
    errors.rePassword = validateRePassword(data.password, data.rePassword);

    return errors;
};
