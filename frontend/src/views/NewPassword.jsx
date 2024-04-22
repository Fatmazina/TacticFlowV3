import React, { useState } from "react";
import axiosClient from "../axios-client.js";

function NewPassword({ email }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const onNewPasswordSubmit = async (ev) => {
    ev.preventDefault();

    if (!password || !passwordConfirmation) {
      setMessage("Tous les champs sont obligatoires.");
      return;
    }
    if (password !== passwordConfirmation) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axiosClient.post("/newpassword", {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      }
      if (response && response.status === 200) {
        setMessage(response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col bg-white px-8 pt-4 w-90 rounded-2xl items-center justify-cente ">
      <div className="z-10 flex overflow-hidden justify-center items-center">
        <div className="pt-4 pb-4 h-full w-90 rounded-2xl flex flex-col gap-1 items-center justify-center">
          <img className="h-16" src="/logo2.png" alt="logo" />
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={onNewPasswordSubmit}
          >
            <span className="text-blue-600 mt-2 text-xs font-semibold mb-2 block w-full max-w-xs">
              Réinitialisation du mot de passe
            </span>

            <input
              className="w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2  focus:border-blue-500  focus:outline-none"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <input
              className="w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2  focus:border-blue-500 focus:outline-none"
              placeholder="Confirmer le nouveau mot de passe"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
            />
            <button
              type="submit"
              className="h-8 w-24 bg-[#212177] mb-1 text-white items-center px-4 pb-1 justify-center font-medium mt-4 rounded-xl"
            >
              Envoyer
            </button>
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
          </form>
        </div>
      </div>{" "}
    </div>
  );
}

export default NewPassword;
