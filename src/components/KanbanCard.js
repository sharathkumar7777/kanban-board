import React from 'react';

function KanbanCard({ ticket }) {
  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
    </div>
  );
}

export default KanbanCard;
