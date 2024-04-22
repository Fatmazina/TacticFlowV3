import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deadline, setDeadline] = useState(null); // Utilisation de useState pour deadline
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(`/projects`, {
        title: title,
        description: description,
        deadline: deadline ? deadline.toISOString().split("T")[0] : null,
      });

      try {
        const notificationResponse = await axiosClient.post(`/notifications`, {
          message: `New Project added : ${title}`,
        });
        toast.success("Project notification successfully!");
      } catch (error) {
        console.error("Error sending project notification:", error);
        toast.error("Error sending project notification. Please try again.");
      }

      window.location.reload();
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project. Please try again.");
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide"
    >
      <form onSubmit={handleSubmit}>
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-gray-900 text-black dark:text-white font-bold shadow-md shadow-gray-600 max-w-md mx-auto w-full px-8 py-8 rounded-xl">
          <h3 className="text-lg">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>
          <div className="mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Project title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border  border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            />
            <label className="text-sm dark:text-white text-gray-500">
              Project Description
            </label>
            <input
              type="text"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border  border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            />
          </div>
          <div className="mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Deadline
            </label>
            <div className="flex items-center space-x-3">
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)} // Mise à jour de la variable deadline
                className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              />
            </div>
          </div>
          <div>
            <button
              className="w-full items-center  hover:opacity-75 dark:text-white mt-8 relative text-white bg-midnightblue py-2 rounded-full"
              type="submit"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditBoardModal;
