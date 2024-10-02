import React from 'react';

function KanbanCard({ ticket, users }) {
  const user = users.find(u => u.id === ticket.userId);

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && <span className="user-icon" style={{backgroundColor: user.available ? '#00FF00' : '#808080'}}>{user.name[0].toUpperCase()}</span>}
      </div>
      <h3>{ticket.title}</h3>
      <div className="card-footer">
        <span className="priority-icon">{getPriorityIcon(ticket.priority)}</span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">⦿ {tag}</span>
        ))}
      </div>
    </div>
  );
}

function getPriorityIcon(priority) {
  switch(priority) {
    case 4: return '🔴';
    case 3: return '🔺';
    case 2: return '🟠';
    case 1: return '🔹';
    default: return '⚪';
  }
}

export default KanbanCard;