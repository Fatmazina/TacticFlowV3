import React, { useState } from 'react';
import ProjectTitle from './ProjectTitle.jsx'; // Assuming ProjectTitle component is in same directory
import MemberAvatar from './MemberAvatar.jsx';
import SearchBar from './SearchBar.jsx';
import Dropdown from './Dropdown.jsx';
// Optional: Import DropdownItem and AddMemberModal components if needed
import search from "../../assets/search1.png";
import rc from "../../assets/redclock.png";
import yc from "../../assets/yellowclock.png";
import arrow from "../../assets/arrow.png";
import filter from "../../assets/filter.png";
import close from "../../assets/close.png";
import adduser from "../../assets/adduser.png";
const ProjectHeader = ({handleAddMember ,showTable, isChef ,project, members1, employees, toggleMembers, handleDropdownToggle ,toggleTable,isDropSelectdownOpen,isDropdownOpen,handleDropdownSelect}) => {

  return (
    <div className="dark:text-white  dark:bg-black dark:bg-opacity-30  w-[1240px] px-4 flex items-center justify-between  rounded-xl h-14 bg-opacity-25 bg-white  text-midnightblue">
    <div className="flex gap-8">
      <h2 className="text-xl dark:text-indigo-400 font-semibold ">
        {project.title}
      </h2>
      <div
        onClick={toggleMembers}
        className="flex hover:cursor-pointer  items-center gap-2"
      >
        {members1.map((member, index) =>
          member.avatar ? (
            <img
              key={index}
              className="w-8 h-8 rounded-full mr-2"
              src={member.avatar}
              alt="Avatar"
            />
          ) : (
            <Avatar
              key={index}
              className="w-8 h-8 rounded-full mr-2"
              icon={<UserOutlined />}
            />
          )
        )}
      </div>
    </div>

    {/* <p className="text-sm mb-6">{project.description}</p> */}

    <div className="flex gap-2 justify-center relative items-center">
      {/* searchbar */}
      <div className="  flex border-gray-500  items-center border-2 opacity-70 justify-between px-2 py-1 rounded-2xl w-80 gap-4 ">
        <input
          type="text"
          className="bg-transparent w-80 focus:outline-none text-white "
        />
        <img
          src={search}
          alt="search icon"
          className="h-4 text-slate-500"
        />
      </div>{" "}
      <button
        onClick={handleDropdownToggle}
        className="  flex p-2 rounded-full items-center focus:bg-white dark:focus:bg-gray-800 gap-2 "
      >
        <img className="h-6" src={filter} alt="icon" />
        <p className="text-gray-500 font-bold ">Filters</p>
      </button>
      <div className=" flex flex-col  absolute top-[39px] -right-2 w-80">
        <div
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } text-base list-none bg-opacity-25 bg-white px-1 rounded-xl rounded-t-none shadow dark:bg-black dark:bg-opacity-30 dark:divide-gray-600`}
        >
          <ul className="py-1">
            <li className="flex px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg items-center">
              <img className="h-6" src={rc} alt="icon" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Overdue
              </a>
            </li>
            <li className="flex px-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg items-center">
              <img className="h-6" src={yc} alt="icon" />

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Due in the next day
              </a>
            </li>
            <li className="flex px-2 justify-between  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg items-center">
              <input
                onClick={handleDropdownSelect}
                className="block px-4 bg-transparent placeholder:text-gray-700 dark:placeholder:text-gray-300 focus:outline-none py-2 text-sm text-gray-700  dark:text-gray-300 "
                placeholder="Select members"
              />
              <button>
                <img className="h-4" src={arrow} alt="icon" />
              </button>
            </li>
            {isDropSelectdownOpen && (
              <ul class="member-list">
                <li data-member-id="1">Member 1</li>
                <li data-member-id="2">Member 2</li>
                <li data-member-id="3">Member 3</li>
              </ul>
            )}
          </ul>
        </div>
      </div>
      {isChef && (
        <button
          onClick={toggleTable}
          className="  flex p-2 items-center rounded-full gap-2 "
        >
          <img className="h-6" src={adduser} alt="icon" />
          <p className="text-gray-500 font-bold">Share</p>{" "}
        </button>
      )}
      {showTable && (
        <div className="  h-[400px] mt-[354px] translate-x-4">
          <div className="flex items-center h-14 justify-between px-6 ">
            <p className="font-bold">Add members to this project</p>
            <button
              onClick={() => {
                setShowTable(false);
              }}
            >
              {" "}
              <img className="h-4" src={close} alt="icon" />
            </button>
          </div>
          <div
            className={` flex justify-center items-start table-container  p-4 rounded-lg h-[620px] shadow-md bg-white  bg-opacity-30  dark:bg-black dark:bg-opacity-30   w-[350px]`}
          >
            <table className="table-container ">
              <thead className="table-header ">
                <tr>
                  <th className=" py-2 text-midnightblue dark:text-white">
                    Profil
                  </th>
                  <th className="py-2 text-midnightblue dark:text-white">
                    Email
                  </th>
                  <th className=" py-2 text-midnightblue dark:text-white"></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {employees.map((employee) => (
                  <tr
                    className="border-t-2 border-b-2 border-indigo-300 "
                    key={employee.id}
                  >
                    <td className="pl-2 pr-5 py-2  flex items-end">
                      {/* Afficher l'avatar de l'employé s'il existe, sinon afficher une image par défaut */}
                      {employee.avatar ? (
                        <img
                          className="w-8 h-8 rounded-full mr-2"
                          src={employee.avatar}
                          alt="Avatar"
                        />
                      ) : (
                        <Avatar
                          className="w-8 h-8 rounded-full mr-2 "
                          icon={<UserOutlined />}
                        />
                      )}

                      {employee.name}
                    </td>
                    <td className=" py-2 pl-6">{employee.email}</td>
                    <td className="px-4 flex items-center justify-center py-2">
                      {/* Appeler handleAddMember avec l'email de l'employé */}
                      <button
                        onClick={() => handleAddMember(employee.email)}
                        className="dark:bg-blue-500 bg-midnightblue  flex  hover:bg-blue-700 text-white font-bold py-1 px-4 items-center justify-center rounded-full "
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default ProjectHeader;
