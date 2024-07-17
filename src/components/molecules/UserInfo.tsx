import React from "react";

interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email }) => (
  <div>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </div>
);

export default UserInfo;
