import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ScrumList = () => {
  const [scrums, setScrums] = useState([]);

  useEffect(() => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);
  }, []);

  const handleDelete = (id) => {
    const updatedScrums = scrums.filter((task) => task.id !== id);
    setScrums(updatedScrums);
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
    alert("✅ Task deleted successfully!");
  };

  return (
    <div className="scrum-list-container">
      <h2>Scrum Tasks</h2>
      {scrums.length === 0 ? <p>No tasks available.</p> : 
        scrums.map((task) => (
          <div key={task.id} className="scrum-task">
            <h3>{task.taskTitle} - ({task.scrumTeam})</h3>
            <p><strong>Description:</strong> {task.taskDescription}</p>
            <p><strong>Status:</strong> {task.taskStatus}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <Link to={`/edit-scrum/${task.id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))
      }
      <Link to="/add-scrum"><button>Add New Task</button></Link>
    </div>
  );
};

export default ScrumList;