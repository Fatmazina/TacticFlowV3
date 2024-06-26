import React, { useState } from "react";
import axiosClient from "../../axios-client";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import plus2 from "./plus2.png";
import close1 from "./close1.png";
import check from "./check.png";

function CreateTask({ projectId, setTasks }) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(`/projects/${projectId}/tasks`, {
        title: taskName,
        dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null, // Convertir la date au format YYYY-MM-DD
      });
      toast.success("Task created successfully!");
      setTaskName("");
      setDueDate(null); // Réinitialiser la date après la création de la tâche
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setShowInput(false); // Cacher l'entrée après la création de la tâche
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };
  const handleCloseInput = () => {
    setTaskName("");
    setDueDate(null);
    setShowInput(false);
  };
  return (
    <div>
      {!showInput && (
        <button
          onClick={handleShowInput}
          className=" text-[#9CA3AF] px-4 py-2 rounded-xl dark:hover:bg-gray-900 hover:bg-gray-300 w-40 focus:outline-none"
        >
          {" "}
          <div className="flex items-center justify-center gap-2">
            <img className="h-4" src={plus2} alt="icon" />
            <p>Add Task</p>
          </div>
        </button>
      )}
      {showInput && (
        <form
          onSubmit={handleCreateTask}
          className=" bg-white dark:bg-gray-900 text-black dark:text-white w-55  rounded-xl p-2"
        >
          <div className="flex flex-col gap-4 py-2 items-center justify-center">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter title "
              className="border-b-2 w-50   bg-transparent border-gray-300 px-2 p-1 focus:border-b-0 dark:focus:border-none focus:outline-gray-300 focus:rounded-xl"
            />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Enter deadline"
              className="border-b-2 w-50   bg-transparent border-gray-300 px-2 p-1 focus:border-b-0   focus:outline-gray-300 focus:rounded-xl"
            />
          </div>

          <div className="flex items-center justify-center px-2 py-2 gap-6 w-full">
            <button
              type="submit"
              className=" p-2 bg-slate-200 items-center  hover:opacity-75 dark:text-white  text-white  rounded-xl"
            >
              <img className="h-6" src={check} alt="icon" />
            </button>
            <button
              type="button"
              className=" px-3 py-3 bg-slate-200 items-center   hover:opacity-75 dark:text-white  text-white  rounded-xl"
              onClick={handleCloseInput}
            >
              <img className="h-4" src={close1} alt="icon" />
            </button>
          </div>
        </form>
      )}
      {/* {taskModalOpen && (
              <AddEditTaskModal
               setTaskModalOpen={setTaskModalOpen}
              />
            )} */}
    </div>
  );
}

export default CreateTask;
