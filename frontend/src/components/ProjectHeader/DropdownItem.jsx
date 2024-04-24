import React from 'react';

const DropdownItem = ({ text, onClick, icon }) => {
  return (
    <li className="flex px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg items-center">
      {icon && <img className="h-6" src={icon} alt="icon" />}
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={onClick}
      >
        {text}
      </a>
    </li>
  );
};

export default DropdownItem;
