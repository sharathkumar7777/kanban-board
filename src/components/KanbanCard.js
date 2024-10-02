import React from 'react';
import DoneIcon from '../assets/icons/Done.svg';
import InProgressIcon from '../assets/icons/in-progress.svg';
import TodoIcon from '../assets/icons/To-do.svg';
import NopriorityIcon from '../assets/icons/No-priority.svg';
import LowIcon from '../assets/icons/img-low-priority.svg';
import MediumIcon from '../assets/icons/img-medium-priority.svg';
import HighIcon from '../assets/icons/img-high-priority.svg';
import UrgentIcon from '../assets/icons/svg-urgent-priority-colour.svg';

function KanbanCard({ ticket, users }) {
  const user = users.find(u => u.id === ticket.userId);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Done': return DoneIcon;
      case 'In progress': return InProgressIcon;
      case 'Todo': return TodoIcon;
      default: return TodoIcon;
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 4: return UrgentIcon;
      case 3: return HighIcon;
      case 2: return MediumIcon;
      case 1: return LowIcon;
      default: return NopriorityIcon;
    }
  };

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && <span className="user-icon" style={{backgroundColor: user.available ? '#00FF00' : '#808080'}}>{user.name[0].toUpperCase()}</span>}
      </div>
      <h3>{ticket.title}</h3>
      <div className="card-footer">
        <img src={getPriorityIcon(ticket.priority)} alt="Priority" className="priority-icon" />
        <img src={getStatusIcon(ticket.status)} alt="Status" className="status-icon" />
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">⦿ {tag}</span>
        ))}
      </div>
    </div>
  );
}

export default KanbanCard;