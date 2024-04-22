import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import Alert from "./Alert";
import { Avatar } from "antd";
import ListTasks from "./test/ListTasks";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsPlus } from "react-icons/bs";
import filter from "../assets/filter.png";
import close from "../assets/close.png";

import AddMemberTask from "./AddMemberTask.jsx";
import adduser from "../assets/adduser.png";
import { UserOutlined } from "@ant-design/icons"; // Import de l'icône utilisateur

import search from "../assets/search1.png";
import rc from "../assets/redclock.png";
import yc from "../assets/yellowclock.png";
import arrow from "../assets/arrow.png";
const ProjectDetails = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [members1, setMembersAff] = useState([]);

  const [project, setProject] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [members, setMembers] = useState([]);

  const [isChef, setIsChef] = useState(false); // Ajout d'un état pour vérifier si l'utilisateur est chef de projet
  const [avatarURL, setAvatarURL] = useState(""); // Etat local pour stocker l'URL de l'avatar
  const [memberAdded, setMemberAdded] = useState("");
  const [auth, setAuth] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropSelectdownOpen, setDropSelectdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownSelect = () => {
    setDropSelectdownOpen(!isDropSelectdownOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get("/user");
        setAuth(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectResponse = await axiosClient.get(`/projects/${projectId}`);
        setProject(projectResponse.data);
        try {
          const response = await axiosClient.get(`/usersAccount`);
          const filteredData = response.data.data.filter(
            (user) =>
              !members1.some((member) => member.email === user.email) &&
              user.id !== (auth?.id || 0) // Handle potential undefined auth
          );
          setEmployees(filteredData);
          console.log(employees);
        } catch (error) {
          console.error("Error fetching users:", error);
        }

        const tasksResponse = await axiosClient.get(
          `/projects/${projectId}/tasks`
        );
        setTasks(tasksResponse.data);

        const userResponse = await axiosClient.get("/user");
        const user = userResponse.data;
        if (user && user.id) {
          const isChefResponse = await axiosClient.post(
            "/check-chef-permissions",
            {
              projectId: projectId,
              userId: user.id,
            }
          );
          setIsChef(isChefResponse.data.isChef); // Mis à jour de l'état en fonction de la réponse
          // window.location.reload();
        }
      } catch (error) {
        console.error("Error loading project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId, members1]);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const membersResponse = await axiosClient.get(
          `/projects/${projectId}/members`
        );
        setMembersAff(membersResponse.data);
      } catch (error) {
        console.error("Error fetching project members:", error);
      }
    };

    fetchProjectMembers();
  }, [projectId]);
  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const toggleMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleAddMember = async (employeeEmail) => {
    const employee = employees.find((emp) => emp.email === employeeEmail);
    if (!employee) {
      console.error("Employee not found");
      return;
    }
    

    try {
      const membershipData = {
        email: employee.email,
        project_id: projectId,
      };

      await axiosClient.post("/memberships", membershipData);

      toast.success("Member added successfully");

      try {
        const notificationMessage = `Member ${employee.name} with email ${employee.email} added to project`;
        await axiosClient.post(`/notifications`, {
          message: notificationMessage,
        });
        // Update UI locally if needed (instead of reload)
        window.location.reload();
      } catch (error) {
        console.error("Error sending project notification:", error);
        toast.error("Error sending project notification. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to add member. Please try again.");
      }
    }
  };
 const handleRemoveMember = async (employeeEmail) => {
    console.log("Employees:", members1);
    console.log("Employee Email:", employeeEmail);
    const employee = members1.find((emp) => emp.email === employeeEmail);
    if (!employee) {
        console.error("Employee not found");
        return;
    }
    
    try {
        const membershipData = {
            email: employee.email,
            project_id: projectId,
        };

        // Use POST method to remove the member
        await axiosClient.delete("/memberships", { data: membershipData });

        toast.success("Member removed successfully");

        try {
            const notificationMessage = `Member ${employee.name} with email ${employee.email} removed from project`;
            await axiosClient.post(`/notifications`, {
                message: notificationMessage,
            });
            // Update UI locally if needed (instead of reload)
            // You may want to update the UI here without reloading the page
        } catch (error) {
            console.error("Error sending project notification:", error);
            toast.error("Error sending project notification. Please try again.");
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error("Failed to remove member. Please try again.");
        }
    }
};


  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className=" h-screen   mt-6 justify-start flex flex-col border-slate-500  items-start gap-6">
        {project && (
          <div className="dark:text-white  dark:bg-black dark:bg-opacity-30  w-[1240px] px-4 flex items-center justify-between  rounded-xl h-14 bg-opacity-25 bg-white  text-midnightblue">
            <div className="flex gap-8">
              <h2 className="text-xl dark:text-indigo-400 font-semibold ">
                {project.title}
              </h2>
              <div
                onClick={toggleMembers}
                className="flex hover:cursor-pointer bg-black items-center gap-2"
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
        )}

        {isChef && (
          <AddMemberTask
            projectId={projectId}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
        {showMembers && (
          <div
          
          
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            setShowMembers(false);
          }}
          className="  py-6 px-6 pb-40 fixed z-[100] overflow-y-scroll left-0 flex justify-center items-center right-0  bottom-0 top-0 bg-[#00000050]">
            <div
              onClick={(e) => e.stopPropagation()}
              className={` flex flex-col justify-start pt-11 items-center  mx-0  rounded-lg h-[500px] shadow-md bg-white    dark:bg-slate-900  w-[450px]`}
            >    <p className="text-midnightblue dark:text-indigo-500 font-bold pb-11">
               Members 
            </p>
                 
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
                        {members1.map((employee) => (
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
                                onClick={() => handleRemoveMember(employee.email)}
                                className="dark:bg-blue-500 bg-midnightblue  flex  hover:bg-blue-700 text-white font-bold py-1 px-4 items-center justify-center rounded-full "
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <ListTasks
            isChef={isChef}
            projectId={projectId}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default ProjectDetails;
