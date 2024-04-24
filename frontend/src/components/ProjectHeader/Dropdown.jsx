import React from 'react';

const Dropdown = ({
  isDropdownOpen,
  handleDropdownToggle,
  handleDropdownSelect,
  children,
}) => {
  return (
    <div className=" flex flex-col  absolute top-[39px] -right-2 w-80">
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } text-base list-none bg-opacity-25 bg-white px-1 rounded-xl rounded-t-none shadow dark:bg-black dark:bg-opacity-30 dark:divide-gray-600`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
