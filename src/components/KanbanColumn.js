import React from 'react';
import KanbanCard from './KanbanCard';
import { ReactComponent as NoPriorityIcon } from '../assets/icons/No-priority.svg';
import { ReactComponent as UrgentIcon } from '../assets/icons/svg-urgent-priority-colour.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/img-high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/icons/img-medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/icons/img-low-priority.svg';
import { ReactComponent as InProgressIcon } from '../assets/icons/in-progress.svg'; // Example status icon
import { ReactComponent as DoneIcon } from '../assets/icons/Done.svg'; // Example status icon
import { ReactComponent as ToDoIcon } from '../assets/icons/To-do.svg'; // Example status icon

// Priority mapping with icons and names
const priorityMapping = {
  0: { name: 'No priority', icon: <NoPriorityIcon /> },
  4: { name: 'Urgent', icon: <UrgentIcon /> },
  3: { name: 'High', icon: <HighPriorityIcon /> },
  2: { name: 'Medium', icon: <MediumPriorityIcon /> },
  1: { name: 'Low', icon: <LowPriorityIcon /> },
};

// Status mapping with icons and names
const statusMapping = {
  'Todo': { name: 'Todo', icon: <ToDoIcon /> },
  'In progress': { name: 'In Progress', icon: <InProgressIcon /> },
  'Done': { name: 'Done', icon: <DoneIcon /> },
  // Add more statuses as needed
};

// Sort priorities in the desired order
const priorityOrder = [0, 4, 3, 2, 1];

function KanbanColumn({ tickets, grouping, ordering }) {
  const groupBy = (key, array) => {
    return array.reduce((result, current) => {
      let group;

      // Handle different groupings
      if (key === 'priority') {
        group = current.priority; // Group by priority
      } else if (key === 'status') {
        group = current.status || 'No Group'; // Group by status
      } else if (key === 'user') {
        group = current.userId || 'No Group'; // Group by userId or assign to 'No Group'
      } else {
        group = current[key] || 'No Group'; // Group by any other key
      }

      if (!result[group]) {
        result[group] = { tickets: [], count: 0 }; // Initialize group with tickets and count
      }
      result[group].tickets.push(current);
      result[group].count += 1;
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
      {Object.keys(groupedTickets)
        .sort((a, b) => {
          if (grouping === 'priority') {
            return priorityOrder.indexOf(parseInt(a)) - priorityOrder.indexOf(parseInt(b));
          }
          return a.localeCompare(b); // Default sort for non-priority groupings
        })
        .map((group) => {
          const isPriorityGrouping = grouping === 'priority';
          const isStatusGrouping = grouping === 'status';

          // Determine group name and icon based on grouping type
          const groupName = isPriorityGrouping
            ? priorityMapping[group]?.name || 'No Group'
            : isStatusGrouping
            ? statusMapping[group]?.name || group // Display the status name or fallback to group
            : group; // For user grouping, it will show the `userId`

          const groupIcon = isPriorityGrouping
            ? priorityMapping[group]?.icon
            : isStatusGrouping
            ? statusMapping[group]?.icon
            : null;

          return (
            <div className="kanban-column" key={group}>
              <h2>
                {groupIcon} {groupName} ({groupedTickets[group].count})
              </h2>
              {sortTickets(groupedTickets[group].tickets).map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default KanbanColumn;
