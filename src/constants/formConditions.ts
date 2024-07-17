const formConditions = {
  nickname: {
    required: { value: true, message: 'Username is required' },
    minLength: { value: 3, message: 'Minimum length is 3' },
    maxLength: { value: 15, message: 'Maximum length is 15' },
    pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Invalid pattern' },
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  age: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  organization: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    required: true,
    minLength: 8,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
  phoneNumber: {
    required: false,
    pattern: /^\d{10,15}$/,
  },
  dateOfBirth: {
    required: false,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
  },
  gender: {
    required: false,
    validate: (value: string) => ['Male', 'Female', 'Other'].includes(value),
  },
  address: {
    required: false,
    minLength: 5,
    maxLength: 100,
  },
};

export default formConditions;
