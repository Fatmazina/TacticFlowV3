import React from "react";
import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../firebase.js";
import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Signup() {
  const nameRef = createRef();
  const departmentRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();

  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleDepartmentChange = (e) => {
    setValue(e.target.value);
  };
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setValue(user.email);
      localStorage.setItem("email", user.email);

      // Send user data to Laravel backend for storage
      const response = await axiosClient.post("/loginwithgoogle", { user });

      if (response.status === 200) {
        // Set user and token
        setUser(response.data.user);
        setToken(response.data.token);

        setRedirect(true);
        window.location.reload();
      } else {
        console.error("Error logging in with Google:", response.data.message);
      }
    } catch (error) {
      console.error("Firebase Google login error:", error);
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  if (redirect) {
    return <Navigate to="/user" />;
  }
  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      departement: departmentRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 403) {
          setErrors({
            message: "You don't have access to create an account.",
          });
        }

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="requestbg flex items-center justify-center">
      <div></div>
      <div className=" z-10  flex min-h-screen overflow-hidden justify-center items-center gap-52 ">
        <div className=" px-8 pt-4 pb-8  h-full shadow-md shadow-slate-600 bg-white bg-opacity-5  rounded-2xl flex flex-col gap-1 items-center justify-center  ">
          <img className="h-16" src="/logo2.png" alt="logo" />

          <p className=" mb-4 text-gray-200 font-semibold flex items-center justify-center text-xl ">
            Sign up into your account
          </p>

          <button
            onClick={handleGoogleLogin}
            className="bg-white bg-opacity-50 h-10  flex items-center w-80  justify-center rounded-xl"
          >
            <p className="flex gap-1  text-gray-500">
              <img
                className="h-7 w-7 relative overflow-hidden shrink-0 z-[2] "
                alt=""
                src="/flatcoloriconsgoogle.svg"
              />
              Sign up with Google
            </p>
          </button>

          <div className="m-4 self-stretch flex flex-row items-center justify-center gap-[13px]">
            <div className="h-px w-[70px] relative box-border z-[1] border-t-[1px] border-solid border-gray-200" />
            <div className="relative   font-normal  text-gray-400 text-xs z-[1]">
              or Sign up with Email
            </div>
            <div className="h-px w-[70px] relative box-border z-[1] border-t-[1px] border-solid border-gray-200" />
          </div>

          <form
            className="flex flex-col gap-4 items-center "
            onSubmit={onSubmit}
          >
            <input
              className="shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ref={nameRef}
              placeholder="FullName"
              type="text "
            />

            <input
              className="shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your email"
              ref={emailRef}
              type="email"
            />
            <input
              className="shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ref={passwordRef}
              placeholder="Password"
              type="password"
            />
            <input
              className=" w-80 shadow-md shadow-slate-600 bg-transparent  rounded-xl  px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              ref={passwordConfirmationRef}
              placeholder="Password Confirmation"
              type="password"
            />
            <select
              id="department"
              name="departement"
              ref={departmentRef}
              className="text-gray-300 shadow-md shadow-slate-600 bg-transparent rounded-xl px-4 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
              value={value}
              onChange={handleDepartmentChange}
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="security">Security</option>
            </select>

            {errors && (
              <div className="text-red-700 rounded-lg   flex items-center mt-4">
                <button
                  className="p-2 rounded-md  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setErrors(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {errors.message && (
                  <p className="font-medium text-sm">{errors.message}</p>
                )}{" "}
                <div className="flex flex-col items-center">
                  {Object.keys(errors).map((key) => (
                    <p className="font-medium text-sm " key={key}>
                      {errors[key][0]}
                    </p>
                  ))}{" "}
                </div>
              </div>
            )}
            <button
              style={{
                background:
                  "linear-gradient(234.84deg, #212177 27.56%, #ce3fa5)",
              }}
              className="btn btn-block h-8  bg-[#212177]   text-white  items-center px-4 w-auto pb-1  justify-center font-medium mb-2 mt-6 rounded-xl  "
            >
              Signup
            </button>
          </form>

          <p className=" text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold text-midnightblue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
