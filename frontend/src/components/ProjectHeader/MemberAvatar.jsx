import React from 'react';

const MemberAvatar = ({ member }) => {
  return (
    member.avatar ? (
      <img
        key={member.id} // Assuming member has an ID for unique key
        className="w-8 h-8 rounded-full mr-2"
        src={member.avatar}
        alt="Avatar"
      />
    ) : (
      <Avatar className="w-8 h-8 rounded-full mr-2" icon={<UserOutlined />} />
    )
  );
};

export default MemberAvatar;
