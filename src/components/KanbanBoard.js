import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import "./KanbanBoard.css";

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Group by status initially
  const [ordering, setOrdering] = useState("priority"); // Sort by priority initially

  useEffect(() => {
    // Fetch tickets from the provided API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets));
  }, []);

  const handleGroupingChange = (event) => {
    const newGrouping = event.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping); // Save to localStorage
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;
    setOrdering(newOrdering);
    localStorage.setItem("ordering", newOrdering); // Save to localStorage
  };

  return (
    <div>
      <div className="display-options">
        <label>Display: </label>
        <div className="dropdown-group">
          <label>Grouping: </label>
          <select onChange={handleGroupingChange} value={grouping}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>

          <label>Ordering: </label>
          <select onChange={handleOrderingChange} value={ordering}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div className="kanban-board">
        <KanbanColumn tickets={tickets} grouping={grouping} ordering={ordering} />
      </div>
    </div>
  );
}

export default KanbanBoard;
