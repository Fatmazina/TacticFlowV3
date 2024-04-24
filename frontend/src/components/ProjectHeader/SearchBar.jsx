import React from 'react';

const SearchBar = () => {
  // Implement search functionality and logic here
  // ...

  return (
    <div className=" flex border-gray-500 items-center border-2 opacity-70 justify-between px-2 py-1 rounded-2xl w-80 gap-4 ">
      <input
        type="text"
        className="bg-transparent w-80 focus:outline-none text-white "
      />
      <img
        src={search} // Assuming 'search' is an image source
        alt="search icon"
        className="h-4 text-slate-500"
      />
    </div>
  );
};

export default SearchBar;
