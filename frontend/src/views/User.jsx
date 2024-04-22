// import React, { useEffect, useState } from "react";
// import axiosClient from "../axios-client.js";
// import { Link } from "react-router-dom";
// import { useStateContext } from "../context/ContextProvider.jsx";

// function User() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { setNotification } = useStateContext();

//   const getUsers = () => {
//     setLoading(true);
//     axiosClient
//       .get("/users")
//       .then(({ data }) => {
//         setLoading(false);
//         setUsers(data.data);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error fetching users:", error);
//       });
//   };

//   const onDeleteClick = (user) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axiosClient
//         .delete(`/users/${user.id}`)
//         .then(() => {
//           setNotification("User was successfully deleted");
//           getUsers();
//         })
//         .catch((error) => {
//           console.error("Error deleting user:", error);
//         });
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <div className=" bg-white flex flex-col p-20 justify-centers w-full h-screen dark:bg-gray-900 dark:text-white">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Users</h1>
//         <Link
//           className="btn-add mb-3 bg-green-500 text-white py-2 px-4 rounded"
//           to="/users/new"
//         >
//           Add new
//         </Link>
//       </div>
//       <div className="card animated fadeInDown">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="text-left dark:text-slate-900 py-2 px-2 bg-gray-300">
//                 ID
//               </th>
//               <th className="text-left  dark:text-slate-900 py-2 px-2 bg-gray-300">
//                 Name
//               </th>
//               <th className="text-left dark:text-slate-900 py-2 px-2 bg-gray-300">
//                 Email
//               </th>
//               <th className="text-left dark:text-slate-900 py-2 px-2 bg-gray-300">
//                 Create Date
//               </th>
//               <th className="text-left dark:text-slate-900 py-2 px-2 bg-gray-300">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               users.map((u) => (
//                 <tr key={u.id}>
//                   <td className="py-2 px-2">{u.id}</td>
//                   <td className="py-2 px-2">{u.name}</td>
//                   <td className="py-2 px-2">{u.email}</td>
//                   <td className="py-2 px-2">{u.created_at}</td>
//                   <td className="py-2 px-2">
//                     <button
//                       className="btn-delete bg-red-500 text-white py-1 px-2 rounded ml-2"
//                       onClick={() => onDeleteClick(u)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default User;
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import UserAdmin from "./UserAdmin";

function User() {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    setLoading(true);

    // Retrieve the user role from localStorage
    const storedUserRole = localStorage.getItem("userRole");

    setLoading(false);
    setUserRole(storedUserRole);
  }, []);

  return (
    <div className=" justify-center w-full h-full   dark:text-white">
      {loading ? (
        <p>Loading user role...</p>
      ) : userRole === "admin" ? (
        <UserAdmin />
      ) : (
        <></>
      )}
    </div>
  );
}

export default User;
