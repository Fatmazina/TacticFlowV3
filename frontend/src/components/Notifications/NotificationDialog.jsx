import React, { useContext, useState, useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

const NotificationDialog = ({ isOpen, onClose }) => {
  const { user } = useStateContext();
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when the component mounts and user changes
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        const response = await axiosClient.get(`/notifications/${user.id}`);
        setNotifications(response.data.notifications.reverse()); // Inverser l'ordre des notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]); // Ajout de user comme dépendance pour recharger les notifications lorsque l'utilisateur change

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto z-50`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center ">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg p-8 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Notifications
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          </div>

          {notifications.length === 0 && (
            <div className="text-center text-gray-500  font-medium">
              You don't have any new notifications yet.
            </div>
          )}

          <ul
            className="space-y-4 overflow-y-scroll"
            style={{ maxHeight: "228px" }}
          >
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex items-center p-4 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                {notification.icon && (
                  <span className="mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                    {notification.icon}
                  </span>
                )}
                <div className="flex-grow">{notification.notification}</div>
              </li>
            ))}
          </ul>

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-midnightblue text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-midnightblue sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;
