"use client";

import { useState } from "react";

interface User {
  name: string;
  email: string;
}

const useUser = () => {
  const [user, setUser] = useState<User>({ name: "John Doe", email: "john.doe@example.com" });

  const updateUserName = (newName: string) => {
    setUser((prevUser) => ({ ...prevUser, name: newName }));
  };

  return {
    user,
    updateUserName,
  };
};

export { useUser };
