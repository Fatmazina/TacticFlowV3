import { React, useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import Dropdown from "./Dropdown.jsx";
import { useEffect } from "react";
import { MessageOutlined } from "@ant-design/icons";
import AddEditBoardModal from "../modals/AddEditBoardModal.jsx";
import HeaderDropdown from "./HeaderDropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTasks } from "@fortawesome/free-solid-svg-icons";
import plus1 from "../assets/plus1.png";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import plus from "../assets/plus1.png";
import NotificationDialog from "./Notifications/NotificationDialog.jsx";
const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const handleNotificationToggle = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const { data } = await axiosClient.get("/user");
          setUser(data);
          axiosClient.get("/user1").then(({ data }) => {
            setUser(data);
            console.log(data);
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token, setUser]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onLogout = async (ev) => {
    ev.preventDefault();

    try {
      await axiosClient.post("/logout");
      setUser({});
      setToken(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      // Gérer l'erreur de déconnexion ici
      // Par exemple, afficher un message à l'utilisateur
    }
  };

  if (!token || !user) {
    return <Navigate to="/home" />;
  }
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gradient-light dark:bg-gradient-dark h-screen w-full overflow-auto`}
    >
      <aside
        className={` fixed w-56 bg-white  bg-opacity-30 top-2 left-2  rounded-2xl z-40 h-[98%]
        pt-4  pl-1
        transition-transform
        -translate-x-full
        ${isOpen ? "sm:translate-x-0" : ""}
        dark:bg-black dark:bg-opacity-30 
      `}
      >
        {" "}
        <button
          className="absolute top-20 -right-2 rounded-full bg-white bg-opacity-50 px-1 "
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon
            className="text-gray-500"
            icon={isOpen ? faAngleDoubleLeft : faAngleDoubleRight}
          />
        </button>
        <div className=" px-3    ">
          <div className="flex items-start justify-start  pb-2   ">
            <a href="https://tac-tic.net/" className="flex pb-2 items-center ">
              <img src="/logo2.png" className="logo h-10 mr-1" />
              <span
                className="textLogo text-midnightblue dark:text-gray-300 mt-1"
                style={{
                  letterSpacing: window.innerWidth < 600 ? "2px" : "4px",
                }}
              >
                acticflow
              </span>
            </a>
          </div>
          <ul className="space-y-6 text-base mt-4 mx-4 font-medium">
            <li>
              <Link
                to="/projects"
                className={`flex text-xs items-center  p-2 rounded-lg group
                ${
                  location.pathname === "/projects"
                    ? "bg-gray-100 dark:bg-indigo-500"
                    : ""
                }
                `}
              >
                {" "}
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
                 ${
                   location.pathname === "/projects"
                     ? " text-gray-900 dark:text-white"
                     : ""
                 }
                 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                  strokeWidth="2"
                  clipRule="evenodd" // Change 'clip-rule' to 'clipRule'
                  fillRule="evenodd" // Change 'fill-rule' to 'fillRule'
                  strokeLinecap="round" // Change 'stroke-linecap' to 'strokeLinecap'
                  strokeLinejoin="round"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className={`flex items-center p-2 text-xs text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group  rounded-lg group
                ${
                  location.pathname === "/profile"
                    ? "bg-gray-100  dark:bg-indigo-500"
                    : ""
                }
                `}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
                  ${
                    location.pathname === "/profile"
                      ? " text-gray-900 dark:text-white"
                      : ""
                  }
                  `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profil</span>
              </Link>
            </li>
            <li>
              <Link
                to="/progress"
                className={`flex items-center p-2 text-xs text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group  rounded-lg group
                ${
                  location.pathname === "/progress"
                    ? "bg-gray-100  dark:bg-indigo-500"
                    : ""
                }
                `}
              >
                <FontAwesomeIcon
                  icon={faTasks}
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
                  ${
                    location.pathname === "/progress"
                      ? " text-gray-900 dark:text-white"
                      : ""
                  }
                  `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Progress</span>
              </Link>
            </li>

            <li>
              <Link
                to="/user"
                className={`flex items-center p-2 text-xs text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group  rounded-lg group
    ${location.pathname === "/user" ? "bg-gray-100  dark:bg-indigo-500" : ""}
    `}
              >
                {" "}
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
  ${location.pathname === "/user" ? " text-gray-900 dark:text-white" : ""}
  `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                  strokeWidth="2"
                  clipRule="evenodd" // Change 'clip-rule' to 'clipRule'
                  fillRule="evenodd" // Change 'fill-rule' to 'fillRule'
                  strokeLinecap="round" // Change 'stroke-linecap' to 'strokeLinecap'
                  strokeLinejoin="round"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">User</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                to="/chat"
                className={`flex items-center p-2 text-xs text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group  rounded-lg group
                ${
                  location.pathname === "/chat"
                    ? "bg-gray-100  dark:bg-indigo-500"
                    : ""
                }
                `}
              >
                {/* <MessageOutlined /> */}
                <FontAwesomeIcon
                  icon={faFacebookMessenger}
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
                  ${
                    location.pathname === "/chat"
                      ? " text-gray-900 dark:text-white"
                      : ""
                  }
                  `}
                />
                <span className="flex-1 dark:hover:text-white  ms-3 dark:text-gray-200  text-gray-700 hover:text-black whitespace-nowrap">
                  Messenger
                </span>
              </Link>
            </li>

            <li>
              <Link className="flex items-center text-xs p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group">
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:dark:text-white group-hover:text-gray-900 dark:group-hover:text-white
  ${location.pathname === "/projects" ? " text-gray-900 dark:text-white" : ""}
  `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <button onClick={onLogout}>
                  <span className="flex-1 dark:hover:text-white  ms-3 dark:text-gray-200  text-gray-700 hover:text-black whitespace-nowrap">
                    Sign Out
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <div className="fixed bottom-4 left-0 w-full">
                <HeaderDropdown
                  setBoardModalOpen={setBoardModalOpen}
                  setOpenDropdown={setOpenDropdown}
                />
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <nav className="fixed  top-4 bg-opacity-70 flex items-start justify-end   rounded-[25px] z-50 right-0  ">
        <div className="px-3 py-1  lg:px-5 lg:pl-3">
          <div className="flex items-center justify-end">
            {/* right side  */}
            <div className="flex space-x-4 items-center md:space-x-6">
              <div className="flex space-x-4 items-center md:space-x-6">
                <button
                  className="text-white  py-2 px-4 rounded-full 
        bg-midnightblue text-base font-semibold hover:opacity-80
        duration-200 button hidden md:block dark:bg-indigo-500  dark:text-white"
                  onClick={() => {
                    setBoardModalOpen((state) => !state);
                  }}
                >
                  <div className="flex justify-center items-center gap-2">
                    <img className="h-3" src={plus1} alt="icon" />
                    <p className="text-base">Add New Board</p>
                  </div>
                </button>
                {/* Icône de notification */}

                <button
                  className="button px-[9px] py-[9px]  text-white bg-midnightblue rounded-full  md:hidden"
                  onClick={() => {
                    setBoardModalOpen((state) => !state);
                  }}
                >
                  <img className="h-4" src={plus} alt="icon" />
                </button>
                <div className="relative">
                  <button
                    onClick={handleNotificationToggle}
                    className="  text-midnightblue hover:opacity-80
        duration-200 button  md:block dark:text-indigo-500  rounded-full  items-center justify-center text-xs"
                  >
                    {/* Ici, vous pouvez utiliser une icône FontAwesome ou toute autre icône de votre choix */}
                    <FontAwesomeIcon className="h-7 sm:h-6 " icon={faBell} />
                  </button>
                  <NotificationDialog
                    isOpen={isNotificationOpen}
                    onClose={handleNotificationToggle}
                  />
                </div>
              </div>

              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen}
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                    )}
                  </button>
                </div>
                <div
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } z-50 absolute right-0 mt-60 text-base list-none bg-white divide-y rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {user.name} &nbsp; &nbsp;
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                      {user.email}
                    </div>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/project"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Profil
                      </Link>
                    </li>
                    <li>
                      <button onClick={onLogout}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`mt-16
      ${isOpen ? "sm:ml-60" : "sm:ml-20"}
      `}
      >
        <div className=" ">
          <div className="pl-11   flex items-start   rounded  ">
            {boardModalOpen && (
              <AddEditBoardModal
                type={boardType}
                setBoardModalOpen={setBoardModalOpen}
              />
            )}
            <main className=" h-full ">
              <Outlet className="relative " />
            </main>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
