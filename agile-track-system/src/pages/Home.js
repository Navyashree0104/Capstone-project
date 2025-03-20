import React, { useState } from "react";


const Home = () => {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleDetails = (team) => {
    setExpandedTeam(expandedTeam === team ? null : team);
  };

  const scrumTeams = {
    A: {
      name: "Scrum Team A",
      description: "Handling feature development and bug fixes.",
      tasks: [
        { title: "Task 1", description: "Implement user authentication.", status: "Completed" },
        { title: "Task 2", description: "Develop frontend dashboard.", status: "In Progress" }
      ],
      members: [
        { name: "Alice Johnson", email: "alice@example.com" },
        { name: "Bob Smith", email: "bob@example.com" }
      ]
    },
    B: {
      name: "Scrum Team B",
      description: "Working on performance optimization and testing.",
      tasks: [
        { title: "Task 1", description: "Optimize database queries.", status: "In Progress" },
        { title: "Task 2", description: "Load testing for API endpoints.", status: "Pending" }
      ],
      members: [
        { name: "Charlie Davis", email: "charlie@example.com" },
        { name: "Diana Brown", email: "diana@example.com" }
      ]
    },
    C: {
      name: "Scrum Team C",
      description: "Focusing on security enhancements and compliance.",
      tasks: [
        { title: "Task 1", description: "Implement role-based access control.", status: "Completed" },
        { title: "Task 2", description: "Ensure GDPR compliance.", status: "In Progress" }
      ],
      members: [
        { name: "Edward Wilson", email: "edward@example.com" },
        { name: "Fiona Green", email: "fiona@example.com" }
      ]
    }
  };

  return (
    <div className="home-container">
      <h1>Scrum Teams</h1>

      <div className="scrum-teams">
        {Object.entries(scrumTeams).map(([key, team]) => (
          <div key={key} className="scrum-team">
            <h2>{team.name}</h2>
            <button className="get-details-btn" onClick={() => toggleDetails(key)}>
              {expandedTeam === key ? "Hide Details" : "Get Details"}
            </button>

            {expandedTeam === key && (
              <div className="scrum-details">
                <p><strong>Description:</strong> {team.description}</p>
                <p><strong>Tasks:</strong></p>
                <ul>
                  {team.tasks.map((task, index) => (
                    <li key={index}>
                      <strong>{task.title}:</strong> {task.description} - <em>{task.status}</em>
                    </li>
                  ))}
                </ul>
                <p><strong>Team Members:</strong></p>
                <ul>
                  {team.members.map((member, index) => (
                    <li key={index}>
                      {member.name} ({member.email})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
