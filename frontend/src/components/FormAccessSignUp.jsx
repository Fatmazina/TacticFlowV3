// import React, { useState } from "react";
// import axiosClient from "../axios-client.js";

// function FormAccessSignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     role: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosClient.post("/storeUnAuthUser", formData);
//       // Vérifier si l'appel API a réussi
//       if (response.status === 201) {
//         // Afficher un message de succès
//         alert("Form submitted successfully!");

//         // Réinitialiser le formulaire
//         setFormData({ name: "", email: "", department: "", role: "" });
//       } else {
//         // Afficher un message d'erreur en cas d'échec
//         console.error("Error:", response.data);
//         alert(
//           "An error occurred while submitting the form. Please try again later."
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error.response.data); // Afficher les détails de l'erreur

//       alert(
//         "An error occurred while submitting the form. Please try again later."
//       );
//     }
//     try {
//       // Send email after successful processing
//       const emailResponse = await sendEmail(formData);
//       console.log("Email response:", emailResponse.data); // Log response for debugging

//       // Display success message or redirect to a confirmation page
//       alert(
//         "Form submitted successfully! You will receive an email confirmation soon."
//       );
//       setFormData({ name: "", email: "", department: "" }); // Reset form
//     } catch (error) {
//       console.error("Error:", error); // Log error for debugging
//       alert(
//         "An error occurred while submitting the form. Please try again later."
//       );
//     }
//   };

//   const sendEmail = async (formData) => {
//     try {
//       const response = await axiosClient.post("/send-email", formData);
//       return response;
//     } catch (error) {
//       throw error; // Re-throw error for handling in handleSubmit
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="flex flex-col items-center justify-center mx-3 w-auto p-8 rounded-lg shadow-md bg-[#f5f5f5] ">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: "#ce3fa5" }}>
//           Request Access
//         </h2>

//         <form className="max-w-full " onSubmit={handleSubmit}>
//           <div
//             className=" p-4 rounded-xl   "
//             style={{
//               background: "linear-gradient(234.84deg, #212177 27.56%, #ce3fa5)",
//             }}
//           >
//             <div className="flex w-full gap-8 mb-6">
//               <div>
//                 {" "}
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-white 0 mb-2"
//                 >
//                   Your name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="px-4 py-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-white mb-2"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="px-4 py-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex w-full gap-8  mb-6">
//               <div className="w-full">
//                 {" "}
//                 <label
//                   htmlFor="department"
//                   className="text-sm font-medium text-white mb-2"
//                 >
//                   Department
//                 </label>
//                 <select
//                   id="department"
//                   name="department"
//                   value={formData.department}
//                   onChange={handleChange}
//                   className="px-4 py-3 mt-2  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                   required
//                 >
//                   <option value="" disabled defaultValue>
//                     Select department
//                   </option>
//                   <option value="web">Web</option>
//                   <option value="mobile">Mobile</option>
//                   <option value="security">Security</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="w-full mb-6">
//                 <label
//                   htmlFor="role"
//                   className="text-sm font-medium text-white mb-2"
//                 >
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="px-4 py-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                   required
//                 >
//                   <option value="" className="" disabled defaultValue>
//                     Select role
//                   </option>
//                   <option value="chef">Chef</option>
//                   <option value="member">Member</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="text-white mt-5 font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 w-full"
//             style={{
//               background: "linear-gradient(234.84deg, #212177 27.56%, #ce3fa5)",
//             }}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FormAccessSignUp;
import React, { useState } from "react";
import axiosClient from "../axios-client.js";

function FormAccessSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/storeUnAuthUser", formData);
      // Vérifier si l'appel API a réussi
      if (response.status === 201) {
        // Afficher un message de succès
        alert("Form submitted successfully!");

        // Réinitialiser le formulaire
        setFormData({ name: "", email: "", department: "", role: "" });
      } else {
        // Afficher un message d'erreur en cas d'échec
        console.error("Error:", response.data);
        alert(
          "An error occurred while submitting the form. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error:", error.response.data); // Afficher les détails de l'erreur

      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
    try {
      // Send email after successful processing
      const emailResponse = await sendEmail(formData);
      console.log("Email response:", emailResponse.data); // Log response for debugging

      // Display success message or redirect to a confirmation page
      alert(
        "Form submitted successfully! You will receive an email confirmation soon."
      );
      setFormData({ name: "", email: "", department: "" }); // Reset form
    } catch (error) {
      console.error("Error:", error); // Log error for debugging
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const sendEmail = async (formData) => {
    try {
      const response = await axiosClient.post("/send-email", formData);
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling in handleSubmit
    }
  };
  return (
    <div className="h-screen">
      {" "}
      <div className="flex requestbg  items-center justify-center w-full h-screen">
        <div className="flex flex-col   items-center justify-center px-8 pb-8  rounded-lg shadow-md shadow-slate-600 bg-white bg-opacity-5 ">
          <h2 className="text-xl font-bold m-4 text-midnightblue">
            Request Access
          </h2>

          <form className="" onSubmit={handleSubmit}>
            <div className="p-2 rounded-t-xl  ">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className=" shadow-md shadow-slate-600 bg-transparent  rounded-xl px-4 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white mb-2"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-white mb-2"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="text-gray-300  shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                >
                  <option
                    className="text-gray-300 "
                    value=""
                    disabled
                    defaultValue
                  >
                    Select department
                  </option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="security">Security</option>
                  {/* Add more options as needed */}
                </select>
                <div className="mb-6"></div>
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-white mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 text-gray-300 shadow-md shadow-slate-600 bg-transparent  rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                >
                  <option value="" disabled defaultValue>
                    Select role
                  </option>
                  <option value="chef">Chef</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white mt-5 font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 w-1/2"
                style={{
                  background:
                    "linear-gradient(234.84deg, #212177 27.56%, #ce3fa5)",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormAccessSignUp;
