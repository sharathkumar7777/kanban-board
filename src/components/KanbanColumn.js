import React from 'react';
import KanbanCard from './KanbanCard';

const priorityIcons = {
  4: "🔴", // Urgent
  3: "🔺", // High
  2: "🟠", // Medium
  1: "🔹", // Low
  0: "⚪", // No priority
};

const priorityNames = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const statusIcons = {
  "Todo": "○",
  "In progress": "◔",
  "Done": "●",
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
    <>
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
                <span className="priority-icon">{priorityIcons[group]}</span>
              )}
              {grouping === 'status' && (
                <span className="status-icon">{statusIcons[group]}</span>
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
    </>
  );
}

export default KanbanColumn;