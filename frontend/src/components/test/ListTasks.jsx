import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";
import axiosClient from "../../axios-client";
import plus from "./plus.png";
import bin from "./bin.png";
import edittask from "./edittask.png";
import CreateTask from "./CreateTask";
import AddMemberTask from "../AddMemberTask";
import DatePicker from "react-datepicker";
import close1 from "./x.png";
import check from "./verifier.png";
import attachement from "./attachement.png";

function ListTasks({ projectId, tasks, setTasks, isChef }) {
  const [todos, setTodos] = useState([]);
  const [doings, setDoings] = useState([]);
  const [dones, setDones] = useState([]);
  const [closeds, setCloseds] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get(`/projects/${projectId}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId, setTasks]);

  useEffect(() => {
    const filteredTodos = tasks.filter((task) => task.status === "To Do");
    const filteredDoings = tasks.filter((task) => task.status === "Doing");
    const filteredDones = tasks.filter((task) => task.status === "Done");
    const filteredClosed = tasks.filter((task) => task.status === "Closed");

    setTodos(filteredTodos);
    setDoings(filteredDoings);
    setDones(filteredDones);
    setCloseds(filteredClosed);
  }, [tasks]);

  const statuses = ["To Do", "Doing", "Done", "Closed"];

  return (
    <div className="flex gap-11">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          doings={doings}
          dones={dones}
          closeds={closeds}
          projectId={projectId}
          isChef={isChef}
          edit={edit}
          setEdit={setEdit}
        />
      ))}
    </div>
  );
}

export default ListTasks;
const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  doings,
  dones,
  closeds,
  projectId,
  isChef,
  edit,
  setEdit,
}) => {
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get(`/projects/${projectId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: async (item) => {
      try {
        // Attendre que canDrop termine avant de continuer
        const authorized = await canDrop(item);
        if (authorized) {
          await axiosClient.post(`/tasks/${item.id}/status`, { status });
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === item.id ? { ...task, status } : task
            )
          );
          toast.success("Task updated successfully");
          fetchTasks();
        } else {
          toast.error("You are not authorized to move this task.");
        }
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Error updating task. Please try again.");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const canDrop = async (item) => {
    try {
      // Faites une requête GET à la route '/user' pour récupérer les informations de l'utilisateur authentifié
      const response = await axiosClient.get("/user");
      const user = response.data;

      if (!user) {
        // Si aucun utilisateur n'est connecté, renvoyez false
        return false;
      }

      // Récupérez l'ID de l'utilisateur connecté
      const authenticatedUserId = user.id;

      // Faites une requête POST à la route '/taskmemberships' pour vérifier si l'utilisateur peut déplacer la tâche
      const taskMembershipResponse = await axiosClient.post(
        "/taskmemberships1",
        {
          taskId: item.id,
          userId: authenticatedUserId,
          projectId: projectId,
        }
      );

      // Vérifiez si le task_id de la tâche déplacée correspond à un task_id auquel l'utilisateur est autorisé
      return taskMembershipResponse.data.includes(item.id);
    } catch (error) {
      console.error("Error checking user permissions:", error);
      return false;
    }
  };
  let text = "todo";
  let bg = "bg-[#F87171]";
  let tasksToMap = todos;
  if (status === "Doing") {
    text = "doing ";
    bg = "bg-[#60A5FA]";
    tasksToMap = doings;
  }
  if (status === "Done") {
    text = "done ";
    bg = "bg-[#34D399]";
    tasksToMap = dones;
  }
  if (status === "Closed") {
    text = "closed ";
    bg = "bg-[#6B7280]";
    tasksToMap = closeds;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      return mTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={` bg-white w-60 min-h-40 h-fit flex flex-col justify-between  gap-4  dark:bg-black dark:bg-opacity-30 rounded-lg p-2 ${
        isOver ? "bg-opacity-30" : "bg-opacity-70"
      }`}
    >
      {" "}
      <Header text={text} bg={bg} count={tasksToMap.length} />{" "}
      <div className="max-h-[310px] flex flex-col gap-2 p-1 overflow-y-scroll">
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task
              edit={edit}
              setEdit={setEdit}
              isChef={isChef}
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}{" "}
      </div>
      {tasksToMap === todos && isChef && (
        <div className="flex  w-full justify-center items-center  ">
          <CreateTask projectId={projectId} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
};
const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-xl uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};
const Task = ({ task, tasks, setTasks, isChef, edit, setEdit, projectId }) => {
  const [editedTitle, setEditedTitle] = useState(task.title); // Pre-populate with initial title
  const [editedDueDate, setEditedDueDate] = useState(task.due_date); // Pre-populate with initial due date
  const [editedState, setEditedState] = useState(task.state);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  useEffect(() => {
    // If desired, fetch task details on form open for a fresher state
    if (edit && edit.id === task.id) {
      fetchTaskDetails(task.id);
    }
  }, [edit, task.id]);

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await axiosClient.get(`/tasks/${taskId}`);
      setEditedTitle(response.data.title);
      setEditedDueDate(response.data.due_date);
    } catch (error) {
      console.error("Error fetching task details:", error);
      // Handle error gracefully
    }
  };

  const handleTaskClick = () => {
    // Set the selected task when clicked
    setEdit({ id: task.id });
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleEditTask = async (e) => {
    e.preventDefault();

    // Update task logic using axios PATCH request
    try {
      const response = await axiosClient.post(`/tasks/${task.id}`, {
        title: editedTitle,
        due_date: editedDueDate,
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? response.data : t))
      );
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again.");
    } finally {
      handleCloseEdit();
      // fetchTasks(); // Re-fetch tasks after successful update
    }
  };

  const handleremove = async (id) => {
    try {
      // Envoyer une requête DELETE pour supprimer la tâche du backend
      await axiosClient.delete(`/tasks/${id}`);

      // Mettre à jour l'état local des tâches après la suppression réussie
      const fTasks = tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(fTasks));
      setTasks(fTasks);
      toast("Task removed", { icon: "👽" });
    } catch (error) {
      console.error("Error removing task:", error);
      toast.error("Error removing task. Please try again.");
    }
  };
  return (
    <div
      ref={drag}
      className={`relative pl-4   bg-white  dark:bg-gray-900 shadow-md dark:shadow-gray-950 dark:shadow-sm rounded-md cursor-grab ${
        isDragging ? "opacity-25" : " opacity-100"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="pt-4 ">
          <p className="text-black dark:text-white ">{task.title}</p>
        </div>

        {isChef && (
          <button onClick={handleTaskClick} className=" text-slate-400 ">
            <img className="h-4 m-2" src={edittask} alt="icon" />
          </button>
        )}
      </div>

      {edit && edit.id === task.id && (
        <div className="py-6 px-6 pb-40 fixed z-[100] overflow-y-scroll left-0 flex justify-center items-center right-0  bottom-0 top-0 bg-[#00000050]">
          <div
            onClick={(e) => e.stopPropagation()}
            className={` flex flex-col justify-start pt-20 items-center  mx-0  rounded-lg h-[500px] shadow-md bg-white    dark:bg-slate-900  w-[450px]`}
          >
            {" "}
            <div>
              <div className="flex  gap-6 py-2 items-start justify-between ">
                <form
                  className="flex flex-col pt-1 gap-8"
                  onSubmit={handleEditTask}
                >
                  <div className="flex gap-14">
                    <label className="font-bold">Title</label>

                    <input
                      className="bg-transparent px-4 outline-none 
                  focus:border-0 rounded-md  
                  focus: outline-indigo-400 focus:outline-gray-300"
                      type="text"
                      value={editedTitle} // Use editedTitle state here
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Enter title "
                    />
                  </div>

                  <div className="flex gap-5">
                    <label className="font-bold ">Deadline</label>

                    <DatePicker
                      className="bg-transparent px-4 outline-none 
                  focus:border-0 rounded-md   focus:outline-gray-300
                  focus: outline-indigo-400 ring-0 "
                      selected={editedDueDate} // Use editedDueDate state here
                      onChange={(date) => setEditedDueDate(date)}
                      // ... other DatePicker properties
                    />
                  </div>

                  <div className="flex items-center justify-center gap-4 px-2 py-2"></div>
                </form>
                {/* <AddMemberTask        projectId={projectId}
            tasks={task}
            setTasks={setTasks}/> */}

                {/* attachment */}
                <button className="flex p-2 bg-slate-200 rounded-xl">
                  <img alt="icon" src={attachement} className="h-6" />
                  attachment
                </button>
                <div></div>
              </div>
              <div className="flex gap-4 ">
                <p className="font-bold">Members</p>
                <div className="h-25 rounded-xl pb-24  w-52 p-1  border-2 border-indigo-400">
                  members bubles
                </div>
              </div>

              <div className="flex justify-around mt-44 items-center">
                <button
                  onClick={handleEditTask}
                  type="submit"
                  className="bg-indigo-400  h-8  w-52 items-center flex-col justify-center hover:opacity-75 dark:text-white text-white rounded-xl p-2"
                >
                  <img className="h-5" src={check} alt="icon" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="bg-indigo-400 h-8  w-52 items-center flex-col justify-center  hover:opacity-75 dark:text-white text-white rounded-xl p-2"
                >
                  <img className="h-4" src={close1} alt="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" flex items-center justify-between ">
        {" "}
        <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
          {task.due_date}
        </p>{" "}
        {isChef && (
          <button
            className=" text-slate-400 "
            onClick={() => handleremove(task.id)}
          >
            <img className="h-4 m-2" src={bin} alt="icon" />
          </button>
        )}
      </div>
    </div>
  );
};
