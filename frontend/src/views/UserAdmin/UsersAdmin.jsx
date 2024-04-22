import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  const fadeAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });
  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/usersAccount")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  };
  const navigate = useNavigate();

  const onDeleteClick = async (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(`/usersAccount/${user.id}`);
        setNotification("User was successfully deleted");
        getUsers();
        navigate(".", { replace: true });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col w-full mt-4 mb-10">
      <h1 className="text-2xl pl-4 font-bold ">Users </h1>
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
                  <td colSpan="7">Loading...</td>
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
                    <td className="p-4">{u.departement}</td>
                    <td className="p-4">{formatDate(u.created_at)}</td>
                    <td className="p-4">
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

export default UsersAdmin;
