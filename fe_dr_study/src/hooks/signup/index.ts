'use client';

import { useState } from 'react';

export const useSignUp = () => {
  const [user, setUser] = useState(null);

  const signUp = (userData: any) => {
    // signUp 로직
    setUser(userData);
    console.log('User signed up successfully');
  };

  return {
    user,
    signUp,
  };
};
