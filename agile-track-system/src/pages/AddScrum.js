import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddScrum = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing tasks
  const [scrumTeams, setScrumTeams] = useState([]);
  const [scrumTeam, setScrumTeam] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [newScrumTeam, setNewScrumTeam] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setScrumTeams(["Scrum Team A", "Scrum Team B", "Scrum Team C"]);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    let scrums = JSON.parse(localStorage.getItem("scrums")) || [];
    if (id) {
      const taskToEdit = scrums.find((task) => task.id === id);
      if (taskToEdit) {
        setScrumTeam(taskToEdit.scrumTeam);
        setTaskTitle(taskToEdit.taskTitle);
        setTaskDescription(taskToEdit.taskDescription);
        setTaskStatus(taskToEdit.taskStatus);
        setAssignedTo(taskToEdit.assignedTo);
        setIsEditing(true);
      }
    }
  }, [id]);

  const handleCreateScrum = (e) => {
    e.preventDefault();

    if (!scrumTeam || !taskTitle || !taskDescription || !assignedTo) {
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }

    let scrums = JSON.parse(localStorage.getItem("scrums")) || [];

    if (isEditing) {
      scrums = scrums.map((task) =>
        task.id === id
          ? { ...task, scrumTeam, taskTitle, taskDescription, taskStatus, assignedTo }
          : task
      );
      alert(`✅ Task updated successfully!`);
    } else {
      const newScrum = {
        id: Date.now().toString(),
        scrumTeam,
        taskTitle,
        taskDescription,
        taskStatus,
        assignedTo,
      };
      scrums.push(newScrum);
      alert(`✅ Scrum task added successfully to ${scrumTeam}!`);
    }

    localStorage.setItem("scrums", JSON.stringify(scrums));
    navigate("/");
  };

  const handleAddScrumTeam = () => {
    if (!newScrumTeam.trim()) {
      alert("⚠️ Please enter a valid Scrum Team name.");
      return;
    }

    setScrumTeams([...scrumTeams, newScrumTeam]);
    setNewScrumTeam("");
    alert(`✅ Scrum Team "${newScrumTeam}" added successfully!`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-scrum-container">
      <h2>{isEditing ? "Edit Scrum Task" : "Add New Scrum Task"}</h2>

      <form onSubmit={handleCreateScrum}>
        <label>Scrum Team:</label>
        <select value={scrumTeam} onChange={(e) => setScrumTeam(e.target.value)} required>
          <option value="">Select a Scrum Team</option>
          {scrumTeams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>

        <label>Add New Scrum Team (Optional):</label>
        <input 
          type="text" 
          value={newScrumTeam} 
          onChange={(e) => setNewScrumTeam(e.target.value)} 
          placeholder="Enter new team name"
        />
        <button type="button" onClick={handleAddScrumTeam}>Add Scrum Team</button>

        <label>Task Title:</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title here..."
        />

        <label>Task Description:</label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task details..."
        />

        <label>Task Status:</label>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Assign To:</label>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.email} value={user.email}>{user.name} ({user.email})</option>
          ))}
        </select>

        <div className="buttons">
          <button type="submit">{isEditing ? "Update Task" : "Create Scrum Task"}</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddScrum;
