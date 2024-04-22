import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import closeicon from "../assets/close.png";
import { useSelector } from "react-redux";
import boardsSlice from "../redux/boardSlice";
function AddEditTaskModal({ type, device, setOpenAddEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onDelete = (id) => {
    setSubtasks((pervState) => pervState.filter((el) => el.id !== id));
  };

  const onChange = (id, newValue) => {
    setSubtasks((pervState) => {
      const newState = [...pervState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onsubmit = (type) => {
    if (type === "add") {
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40 absolute overflow-y-scroll  left-0 flex  right-0   bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0  bottom-0 top-0 bg-[#00000080]"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
    >
      {/* Modal section */}
      <div
        className="scrollbar-hide  overflow-y-scroll max-h-[95vh]
       my-auto bg-white dark:bg-gray-900 text-black dark:text-white font-bold shadow-md shadow-gray-600 max-w-md mx-auto w-full px-8 py-8 rounded-xl
     "
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        {/* Task Name  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="bg-transparent px-4 py-2 outline-none 
           focus:border-0 rounded-md  border-gray-600
           focus: outline-[#635fc7] ring-0 "
            value={title}
          />
        </div>

        {/* Description */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="bg-transparent px-4 py-2  outline-none 
           focus:border-0 min-h-[200px] rounded-md  border-gray-600
           focus: outline-[#635fc7] ring-0 "
            value={description}
          />
        </div>

        {/* Subtasks Section */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white  text-gray-500">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => {
            return (
              <div key={index} className="flex items-center w-full ">
                <input
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value);
                  }}
                  type="text"
                  value={subtask.title}
                  className="bg-transparent outline outline-1 outline-gray-300
                        focus:border-0 flex-grow px-4 py-2 rounded-md text-sm
                        border-gray-600 focus:outline-mediumslateblue
                        "
                />

                <img
                  src={closeicon}
                  className="cursor-pointer m-4 h-4"
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                />
              </div>
            );
          })}

          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center text-white dark:text-midnightblue dark:bg-white
           bg-midnightblue py-2 rounded-full
        "
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current Status Section  */}
        <div className="mt-8 flex flex-col ">
          <label className="test-sm dark:text-white text-gray-500">
            Current status
          </label>
          <select
            className="select-status  flex flex-grow  px-2 py-2 rounded-md text-sm bg-transparent 
              focus:border-0 border border-gray-300 focus:outline-midnightblue outline-none "
          >
            {columns.map((column, index) => (
              <option value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onsubmit(type);
              }
            }}
            className="w-full items-center text-white bg-midnightblue py-2 rounded-full "
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
