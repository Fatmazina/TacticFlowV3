import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewPassword from "./NewPassword";
import axiosClient from "../axios-client.js";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (!email) {
      setMessage("L'email est obligatoire.");
      return;
    }

    try {
      const response = await axiosClient.post("/passwordreset", {
        email: email,
      });

      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("L'utilisateur existe avec cette adresse email.");
        setShowNewPasswordForm(true);
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 404) {
        setMessage(response.data.message);
      } else {
        setMessage(
          "Une erreur s'est produite. Veuillez réessayer ultérieurement."
        );
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col bg-white w-96 h-auto px-8 pt-4 w-90 rounded-2xl items-center justify-cente">
        {showNewPasswordForm ? (
          <NewPassword email={email} />
        ) : (
          <div className="z-10 flex overflow-hidden justify-center items-center">
            <div className="flex flex-col gap-1 items-center justify-center">
              <img className="h-16" src="/logo2.png" alt="logo" />
              <form
                className="flex flex-col items-center gap-2"
                onSubmit={onSubmit}
              >
                <span className="text-blue-600 mt-2 text-xs font-semibold mb-1 block w-full max-w-xs">
                  Forget your password?
                </span>

                <input
                  className="w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Entrez votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />

                {message && (
                  <div className="text-red-500 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <button onClick={() => setMessage(null)}>
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2"
                          />
                        </svg>
                      </button>
                      <p className="font-medium text-sm">{message}</p>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="h-8 w-24 bg-[#212177] mb-1 text-white items-center px-4 pb-1 justify-center font-medium mt-4 rounded-xl"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        )}
        <Link className="my-4" to="/login">
          <span className="font-semibold font-inter text-[#212177]">Login</span>
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
