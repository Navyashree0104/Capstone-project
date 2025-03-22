import React, { useState, useEffect } from "react";

const Home = () => {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [userScrums, setUserScrums] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState({});

  // Load scrums from localStorage on mount
  useEffect(() => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setUserScrums(storedScrums);

    // Load task statuses from localStorage
    const storedStatuses = JSON.parse(localStorage.getItem("taskStatuses")) || {};
    setTaskStatuses(storedStatuses);
  }, []);

  const toggleDetails = (team) => {
    setExpandedTeam(expandedTeam === team ? null : team);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTaskStatuses((prev) => ({
      ...prev,
      [taskId]: newStatus
    }));
  };

  const saveStatus = (taskId) => {
    const updatedStatuses = { ...taskStatuses };
    localStorage.setItem("taskStatuses", JSON.stringify(updatedStatuses));
    alert("✅ Task status updated successfully!");
  };

  const scrumTeams = {
    "Scrum Team A": {
      name: "Scrum Team A",
      description: "Handling feature development and bug fixes.",
      tasks: [
        { id: "task1", title: "Task 1", description: "Implement user authentication.", status: "Completed" },
        { id: "task2", title: "Task 2", description: "Develop frontend dashboard.", status: "In Progress" }
      ],
      members: ["alice@example.com", "bob@example.com"]
    },
    "Scrum Team B": {
      name: "Scrum Team B",
      description: "Working on performance optimization and testing.",
      tasks: [
        { id: "task3", title: "Task 1", description: "Optimize database queries.", status: "In Progress" },
        { id: "task4", title: "Task 2", description: "Load testing for API endpoints.", status: "Pending" }
      ],
      members: ["charlie@example.com", "diana@example.com"]
    },
    "Scrum Team C": {
      name: "Scrum Team C",
      description: "Focusing on security enhancements and compliance.",
      tasks: [
        { id: "task5", title: "Task 1", description: "Implement role-based access control.", status: "Completed" },
        { id: "task6", title: "Task 2", description: "Ensure GDPR compliance.", status: "In Progress" }
      ],
      members: ["edward@example.com", "fiona@example.com"]
    }
  };

  return (
    <div className="home-container">
      <h1>Scrum Teams</h1>

      <div className="scrum-teams">
        {Object.entries(scrumTeams).map(([teamName, team]) => {
          const teamTasks = [...team.tasks];

          // Add User-Created Scrums under the respective team
          const filteredUserTasks = userScrums.filter((scrum) => scrum.scrumTeam === team.name);
          filteredUserTasks.forEach((scrum) => {
            teamTasks.push({
              id: scrum.id,
              title: scrum.taskTitle,
              description: scrum.taskDescription,
              status: scrum.taskStatus
            });
          });

          return (
            <div key={teamName} className="scrum-team">
              <h2>{team.name}</h2>
              <button className="get-details-btn" onClick={() => toggleDetails(teamName)}>
                {expandedTeam === teamName ? "Hide Details" : "Get Details"}
              </button>

              {expandedTeam === teamName && (
                <div className="scrum-details">
                  <p><strong>Description:</strong> {team.description}</p>

                  <p><strong>Tasks:</strong></p>
                  <ul>
                    {teamTasks.map((task) => (
                      <li key={task.id} className="scrum-task">
                        <strong>{task.title}:</strong> {task.description} - 
                        <select
                          value={taskStatuses[task.id] || task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className="status-dropdown"
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button onClick={() => saveStatus(task.id)} className="save-status-btn">
                          Save
                        </button>
                      </li>
                    ))}
                  </ul>

                  <p><strong>Team Members:</strong></p>
                  <ul>
                    {Array.from(new Set([
                      ...team.members, // Original team members
                      ...filteredUserTasks.map((scrum) => scrum.assignedTo) // Add assigned users
                    ])).map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
