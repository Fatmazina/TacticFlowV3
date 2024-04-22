import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

function UnauthorizedUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const fadeAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/UnauthorizedUsers");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const onAddAuthClick = async (user) => {
    try {
      const formData = {
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
      };

      await axiosClient.post("/users", formData);
      await axiosClient.delete(`/UnauthorizedUsers/${user.id}`);
      setNotification("User was successfully authorized");
      getUsers(); // Refresh the list
      navigate(".", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error authorizing user:", error);
      setNotification("Error authorizing user"); // Notify user of error
    }
  };

  // Fetch unauthorized users on component mount
  useEffect(() => {
    getUsers();
  }, []);
  const onDeleteClick = async (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(`/UnauthorizedUsers/${user.id}`);
        setNotification("User was successfully deleted");
        getUsers();
        navigate(".", { replace: true });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="flex flex-col  w-full mb-5">
      <h1 className="text-2xl pl-4 font-bold ">Unauthorized users</h1>
      <div className="user-table mt-6 card animated fadeInDown">
        <Card className="h-full w-full bg-white bg-opacity-35 ">
          <table className="w-full  min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Email
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Department
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Create Date
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="text-center">
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : (
                users.map((u) => (
                  <animated.tr
                    key={u.id}
                    style={fadeAnim}
                    className="even:bg-blue-gray-50/50"
                  >
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.department}</td>
                    <td className="p-4">{u.created_at}</td>
                    <td className="p-4">
                      <button
                        className="btn-add-auth bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2"
                        onClick={() => onAddAuthClick(u)}
                      >
                        Add Auth
                      </button>
                      <button
                        className="btn-delete bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2"
                        onClick={() => onDeleteClick(u)}
                      >
                        Delete
                      </button>
                    </td>
                  </animated.tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default UnauthorizedUser;
