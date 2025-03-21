import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Profile = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // ✅ Fetch employees & tasks every time the component renders
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || {};
    const storedTasks = JSON.parse(localStorage.getItem("scrumTasks")) || [];

    setEmployees(storedEmployees);
    setTasks(storedTasks);
  }, []);

  const handleGetDetails = (email) => {
    setSelectedEmployee(email);

    // ✅ Ensure employee always has at least 1 task
    const userTasks = tasks.filter((task) => task.teamMembers.includes(email));

    if (userTasks.length === 0) {
      const newTask = {
        id: Date.now().toString(),
        title: "General Task",
        description: "Backend development",
        status: "To Do",
        teamMembers: [email],
      };

      const updatedTasks = [...tasks, newTask];
      localStorage.setItem("scrumTasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  // ✅ Handle delete user for the currently logged-in user
  const handleDeleteUser = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Remove user from employees
      const updatedEmployees = { ...employees };
      delete updatedEmployees[email];
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);

      // Remove user from tasks
      const updatedTasks = tasks.map((task) => ({
        ...task,
        teamMembers: task.teamMembers.filter((member) => member !== email),
      }));
      localStorage.setItem("scrumTasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);

      // Reset selected employee if they were being viewed
      if (selectedEmployee === email) {
        setSelectedEmployee(null);
      }
    }
  };

  return (
    <div>
      <Header onLogout={() => console.log("Logged out!")} />
      <div className="profile-container">
        <h2>User Profiles</h2>

        {/* ✅ Display all employees */}
        {Object.values(employees).map((employee, index) => (
          <div key={index} className="employee-card">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <button className="history-btn" onClick={() => handleGetDetails(employee.email)}>
              Get Details
            </button>

            {/* ✅ Show Delete Button for the Logged-in User */}
            {/* The logged-in user can delete their own profile */}
            {localStorage.getItem("loggedInUserEmail") === employee.email && (
              <button className="delete-btn" onClick={() => handleDeleteUser(employee.email)}>
                Delete Your Profile
              </button>
            )}
          </div>
        ))}

        {/* ✅ Show Employee's Tasks */}
        {selectedEmployee && (
          <div className="employee-tasks">
            <h3>Tasks Assigned to {employees[selectedEmployee]?.name || "Selected User"}</h3>
            <ul>
              {tasks
                .filter((task) => task.teamMembers.includes(selectedEmployee))
                .map((task, index) => (
                  <li key={index}>
                    <strong>Title:</strong> {task.title} <br />
                    <strong>Description:</strong> {task.description} <br />
                    <strong>Status:</strong> {task.status}
                  </li>
                ))}
            </ul>
            <button className="close-btn" onClick={() => setSelectedEmployee(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
