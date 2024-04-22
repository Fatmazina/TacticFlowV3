import React from "react";

import AuthorizedUser from "./UserAdmin/AuthorizedUser.jsx";
import UnauthorizedUser from "./UserAdmin/UnauthorizedUser.jsx";
import UsersAdmin from "./UserAdmin/UsersAdmin.jsx";
function UserAdmin() {
  return (
    <div className=" flex flex-col h-full dark:text-white">
      <UnauthorizedUser />
      <AuthorizedUser />
      <UsersAdmin />
    </div>
  );
}

export default UserAdmin;
// import React from "react";

// import AuthorizedUser from "./UserAdmin/AuthorizedUser.jsx";
// import UnauthorizedUser from "./UserAdmin/UnauthorizedUser.jsx";
// import UsersAdmin from "./UserAdmin/UsersAdmin.jsx";
// function UserAdmin() {
//   return (
//     <div className=" flex flex-col   md:p-10   dark:text-white">
//       <div className="flex gap-4">
//         <UnauthorizedUser className="md:w-1/2" />
//         <AuthorizedUser className="md:w-1/2" />
//       </div>
//       <UsersAdmin />
//     </div>
//   );
// }

// export default UserAdmin;
