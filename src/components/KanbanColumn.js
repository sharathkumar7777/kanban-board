import React from 'react';
import KanbanCard from './KanbanCard';

// Importing SVG icons
import { ReactComponent as ToDoIcon } from '../assets/icons/To-do.svg';
import { ReactComponent as InProgressIcon } from '../assets/icons/in-progress.svg';
import { ReactComponent as DoneIcon } from '../assets/icons/Done.svg';
import { ReactComponent as CancelledIcon } from '../assets/icons/Cancelled.svg';
import { ReactComponent as BacklogIcon } from '../assets/icons/Backlog.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/icons/No-priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/img-high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/icons/img-medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/icons/img-low-priority.svg';
import { ReactComponent as UrgentIcon } from '../assets/icons/svg-urgent-priority-colour.svg';

const icons = {
  'No priority': <NoPriorityIcon />,
  'Urgent': <UrgentIcon />,
  'High': <HighPriorityIcon />,
  'Medium': <MediumPriorityIcon />,
  'Low': <LowPriorityIcon />,
  'Todo': <ToDoIcon />,
  'In progress': <InProgressIcon />,
  'Done': <DoneIcon />,
  'Cancelled': <CancelledIcon />,
  'Backlog': <BacklogIcon />
};

function KanbanColumn({ tickets, grouping, ordering }) {
  const groupBy = (key, array) => {
    return array.reduce((result, current) => {
      const group = current[key] || 'No Group';
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
            {icons[group]} {/* Render the appropriate icon based on the group */}
            {group}
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
