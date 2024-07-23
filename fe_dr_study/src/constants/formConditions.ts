const formConditions = {
    plainText: {
        required: { value: true, message: '필수 입력 항목입니다.' },
    },
    nickname: {
        required: { value: true, message: '닉네임은 필수 입력 항목입니다.' },
        minLength: {
            value: 3,
            message: '닉네임은 최소 3자 이상이어야 합니다.',
        },
        maxLength: { value: 15, message: '닉네임은 최대 15자까지 가능합니다.' },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: '닉네임은 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.',
        },
    },
    email: {
        required: { value: true, message: '이메일은 필수 입력 항목입니다.' },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일 형식이 아닙니다.',
        },
    },
    age: {
        required: { value: true, message: '나이는 필수 입력 항목입니다.' },
        pattern: {
            value: /^\d{1,3}$/,
            message: '유효한 나이 형식이 아닙니다: 숫자만 입력하세요.',
        },
    },
    organization: {
        required: { value: true, message: '조직명은 필수 입력 항목입니다.' },
        pattern: {
            value: /^[a-zA-Z0-9\s]+$/,
            message:
                '유효한 조직명 형식이 아닙니다: 영문, 숫자, 공백만 사용할 수 있습니다.',
        },
    },
    password: {
        required: { value: true, message: '비밀번호는 필수 입력 항목입니다.' },
        minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다.',
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            message: '비밀번호는 최소 하나의 문자와 숫자를 포함해야 합니다.',
        },
    },
    phoneNumber: {
        required: { value: false },
        pattern: {
            value: /^\d{10,15}$/,
            message:
                '유효한 전화번호 형식이 아닙니다: 10자리에서 15자리의 숫자만 입력하세요.',
        },
    },
    dateOfBirth: {
        required: { value: false },
        pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message:
                '유효한 생년월일 형식이 아닙니다: YYYY-MM-DD 형식으로 입력하세요.',
        },
    },
    gender: {
        required: { value: false },
        validate: (value: string) =>
            ['Male', 'Female', 'Other'].includes(value) ||
            '유효한 성별 형식이 아닙니다: Male, Female, Other 중 하나를 선택하세요.',
    },
    address: {
        required: { value: false },
        minLength: { value: 5, message: '주소는 최소 5자 이상이어야 합니다.' },
        maxLength: { value: 100, message: '주소는 최대 100자까지 가능합니다.' },
    },
};

export default formConditions;
