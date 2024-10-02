import React from 'react';
import KanbanCard from './KanbanCard';
import { ReactComponent as NoPriorityIcon } from '../assets/icons/No-priority.svg';
import { ReactComponent as UrgentIcon } from '../assets/icons/svg-urgent-priority-colour.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/img-high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/icons/img-medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/icons/img-low-priority.svg';

// Example user mapping
const userMapping = {
  'usr-1': 'User 1',
  'usr-2': 'User 2',
  'usr-5': 'User 5',
  // Add more user IDs to user name mappings as needed
};

const icons = {
  'No priority': <NoPriorityIcon />,
  'Urgent': <UrgentIcon />,
  'High': <HighPriorityIcon />,
  'Medium': <MediumPriorityIcon />,
  'Low': <LowPriorityIcon />,
};

function KanbanColumn({ tickets, grouping, ordering }) {
  const groupBy = (key, array) => {
    return array.reduce((result, current) => {
      let group;
      if (key === 'user') {
        // Use the userMapping to resolve the user name from the userId
        group = userMapping[current.userId] || 'No Group';
      } else {
        // Group by status, priority, etc.
        group = current[key] || 'No Group';
      }

      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(current);
      return result;
    }, {});
  };

  const sortTickets = (ticketsArray) => {
    if (ordering === 'priority') {
      return ticketsArray.sort((a, b) => b.priority - a.priority); // Sort by priority (descending)
    } else if (ordering === 'title') {
      return ticketsArray.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (ascending)
    }
    return ticketsArray;
  };

  const groupedTickets = groupBy(grouping, tickets);

  return (
    <div className="kanban-columns">
      {Object.keys(groupedTickets).map((group) => (
        <div className="kanban-column" key={group}>
          <h2>
            {icons[group]} {group}
          </h2>
          {sortTickets(groupedTickets[group]).map((ticket) => (
            <KanbanCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanColumn;
