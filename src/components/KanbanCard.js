import React from 'react';

function KanbanCard({ ticket }) {
  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      {/* Render the tag if it exists */}
      {ticket.tag && (
        <div className="kanban-card-tag">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="kanban-card-tag-label">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default KanbanCard;
