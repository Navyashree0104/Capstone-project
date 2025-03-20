import React, { useState } from "react";
import Header from "../components/Header";

const Profile = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = {
    1: {
      name: "Employee One",
      tasks: [
        { title: "Task One", description: "Front-end development", status: "To Do" },
        { title: "Task Two", description: "Front-end code review", status: "In Progress" },
      ],
    },
    2: {
      name: "Employee Two",
      tasks: [
        { title: "Task One", description: "Developing UI Components", status: "Completed" },
        { title: "Task Two", description: "Fixing Backend Bugs", status: "In Progress" },
      ],
    },
    3: {
      name: "Employee Three",
      tasks: [
        { title: "Task One", description: "Database Optimization", status: "Pending" },
        { title: "Task Two", description: "Security Enhancements", status: "Completed" },
      ],
    },
    4: {
      name: "Employee Four",
      tasks: [
        { title: "Task One", description: "Performance Testing", status: "To Do" },
        { title: "Task Two", description: "Code Review", status: "Completed" },
      ],
    },
    5: {
      name: "Employee Five",
      tasks: [
        { title: "Task One", description: "Developing API Endpoints", status: "In Progress" },
        { title: "Task Two", description: "Writing Documentation", status: "Completed" },
      ],
    },
  };

  return (
    <div>
      <Header onLogout={() => console.log("Logged out!")} />
      <div className="profile-container">
        <h2>User Profiles</h2>

        <div className="employee-buttons">
          {Object.entries(employees).map(([id, employee]) => (
            <button key={id} className="employee-btn" onClick={() => setSelectedEmployee(id)}>
              {employee.name}
            </button>
          ))}
        </div>

        {selectedEmployee && (
          <div className="employee-tasks">
            <h3>Tasks worked by {employees[selectedEmployee].name}</h3>
            <ul>
              {employees[selectedEmployee].tasks.map((task, index) => (
                <li key={index}>
                  <strong>Title:</strong> {task.title} <br />
                  <strong>Description:</strong> {task.description} <br />
                  <strong>Status:</strong> {task.status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close All Button */}
        {selectedEmployee && (
          <button className="close-all-btn" onClick={() => setSelectedEmployee(null)}>
            Close All
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
