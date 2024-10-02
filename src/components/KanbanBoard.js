import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import "./KanbanBoard.css";

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "status");
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering") || "priority");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  const handleDisplayClick = () => {
    setShowOptions(!showOptions);
  };

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  return (
    <div className="kanban-board">
      <div className="display-options">
        <button onClick={handleDisplayClick} className="display-button">
          <span className="icon">≡</span> Display <span className="icon">▼</span>
        </button>
        {showOptions && (
          <div className="options-dropdown">
            <div className="option">
              <label>Grouping</label>
              <select onChange={handleGroupingChange} value={grouping}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="option">
              <label>Ordering</label>
              <select onChange={handleOrderingChange} value={ordering}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="kanban-columns">
        <KanbanColumn tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
      </div>
    </div>
  );
}

export default KanbanBoard;