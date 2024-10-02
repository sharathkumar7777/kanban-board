import React from 'react';
import KanbanCard from './KanbanCard';
import DoneIcon from '../assets/icons/Done.svg';
import InProgressIcon from '../assets/icons/in-progress.svg';
import TodoIcon from '../assets/icons/To-do.svg';
import NopriorityIcon from '../assets/icons/No-priority.svg';
import LowIcon from '../assets/icons/img-low-priority.svg';
import MediumIcon from '../assets/icons/img-medium-priority.svg';
import HighIcon from '../assets/icons/img-high-priority.svg';
import UrgentIcon from '../assets/icons/svg-urgent-priority-colour.svg';

const priorityIcons = {
  4: UrgentIcon,
  3: HighIcon,
  2: MediumIcon,
  1: LowIcon,
  0: NopriorityIcon,
};

const priorityNames = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const statusIcons = {
  "Todo": TodoIcon,
  "In progress": InProgressIcon,
  "Done": DoneIcon,
};

function KanbanColumn({ tickets, users, grouping, ordering }) {
  const groupBy = (key, array) => {
    return array.reduce((result, current) => {
      let group = current[key];
      if (key === 'userId') {
        group = users.find(user => user.id === current.userId)?.name || 'Unassigned';
      } else if (key === 'priority') {
        group = current.priority;
      }
      if (!result[group]) {
        result[group] = { tickets: [], count: 0 };
      }
      result[group].tickets.push(current);
      result[group].count += 1;
      return result;
    }, {});
  };

  const sortTickets = (ticketsArray) => {
    if (ordering === 'priority') {
      return ticketsArray.sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'title') {
      return ticketsArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketsArray;
  };

  const groupedTickets = groupBy(grouping === 'user' ? 'userId' : grouping, tickets);
  const priorityOrder = [4, 3, 2, 1, 0];

  return (
    <div className="kanban-columns">
      {Object.keys(groupedTickets)
        .sort((a, b) => {
          if (grouping === 'priority') {
            return priorityOrder.indexOf(parseInt(a)) - priorityOrder.indexOf(parseInt(b));
          }
          return a.localeCompare(b);
        })
        .map((group) => (
          <div className="kanban-column" key={group}>
            <div className="kanban-column-header">
              {grouping === 'priority' && (
                <img src={priorityIcons[group]} alt="Priority" className="priority-icon" />
              )}
              {grouping === 'status' && (
                <img src={statusIcons[group]} alt="Status" className="status-icon" />
              )}
              {grouping === 'user' && (
                <span className="user-icon">{group[0].toUpperCase()}</span>
              )}
              <h2>{grouping === 'priority' ? priorityNames[group] : group} ({groupedTickets[group].count})</h2>
              <div className="header-icons">
                <span>+</span>
                <span>⋯</span>
              </div>
            </div>
            <div className="kanban-cards">
              {sortTickets(groupedTickets[group].tickets).map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} users={users} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default KanbanColumn;