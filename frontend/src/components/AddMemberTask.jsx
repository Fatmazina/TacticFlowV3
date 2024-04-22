import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { BsPlus } from "react-icons/bs";
import edittask from "../assets/edittask.png";

function AddMemberTask({ projectId, tasks, setTasks }) {
  const [showTable, setShowTable] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [selectedTaskTitle, setSelectedTaskTitle] = useState(""); // Ajout du state pour stocker le titre de la tâche sélectionnée

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const membersResponse = await axiosClient.get(
          `/projects/${projectId}/members`
        );
        setMembers(membersResponse.data);
      } catch (error) {
        console.error("Error fetching project members:", error);
        toast.error("Failed to fetch project members. Please try again.");
      }
    };

    const fetchProjectDetails = async () => {
      try {
        const tasksResponse = await axiosClient.get(
          `/projects/${projectId}/tasks`
        );
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching project tasks:", error);
        toast.error("Failed to fetch project tasks. Please try again.");
      }
    };

    fetchProjectMembers();
    fetchProjectDetails();
  }, [projectId]);

  const handleTaskChange = (memberId, taskId, taskTitle) => {
    setSelectedTasks({ ...selectedTasks, [memberId]: taskId });
    setSelectedTaskTitle(taskTitle); // Mise à jour du titre de la tâche sélectionnée lors du changement
  };

  const handleAddMember = async (memberEmail) => {
    const member = members.find((mem) => mem.email === memberEmail);
    if (!member) {
      console.error("Member not found");
      return;
    }

    const taskId = selectedTasks[member.id];
    if (!taskId) {
      console.error("Task not selected");
      return;
    }

    try {
      const taskMembershipData = {
        email: member.email,
        taskId: taskId,
        projectId: projectId,
      };

      await axiosClient.post("/taskmemberships", taskMembershipData);

      toast.success("Member added to task successfully");
      try {
        const notificationResponse = await axiosClient.post(`/notifications`, {
          message: `Member ${member.email} added to task "${selectedTaskTitle} successfully"`, // Utilisation du titre de la tâche sélectionnée ici
        });

        setTimeout(() => {
          window.location.reload(); // Recharge la page après 10 secondes
        }, 2000);
      } catch (error) {
        console.error("Error sending project notification:", error);
      }
    } catch (error) {
      console.error("Failed to add member to task:", error);
      toast.error("Failed to add member to task. Please try again.");
    }
  };

  return (
    <div className="">
      <button
        onClick={toggleTable}
        className="bg-white   flex p-2 rounded-full gap-2 dark:bg-gray-800"
      >
        <img className="h-6" src={edittask} alt="edit icon " />
        <p className="text-[#9CA3AF]">Tasks</p>
      </button>
      {showTable && (
        <div
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            setShowTable(false);
          }}
          className="fixed right-0  left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide"
        >
          <div
            className={` flex justify-center w-fit items-start table-container mx-0  rounded-lg h-fit shadow-md bg-white    dark:bg-slate-900 p-6 `}
          >
            <table className="table-container ">
              <thead className="table-header">
                <tr>
                  <th className="px-4 py-2 text-midnightblue dark:text-white">
                    Name
                  </th>
                  <th className="px-4 py-2 text-midnightblue dark:text-white">
                    Email
                  </th>
                  <th className="px-4 py-2 text-midnightblue dark:text-white">
                    Task
                  </th>
                  <th className="px-4 py-2 text-midnightblue dark:text-white">
                    Add member
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {members.map((member, index) => (
                  <tr key={index}>
                    {" "}
                    {/* Utilisation de l'index comme clé */}
                    <td className="px-4 py-2">{member.name}</td>
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">
                      <select
                        value={selectedTasks[member.id] || ""}
                        onChange={(e) =>
                          handleTaskChange(
                            member.id,
                            e.target.value,
                            e.target.options[e.target.selectedIndex].text
                          )
                        }
                        className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                      >
                        <option value="">Select a task</option>
                        {tasks.map((task) => (
                          <option key={task.id} value={task.id}>
                            {task.title}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleAddMember(member.email)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMemberTask;
