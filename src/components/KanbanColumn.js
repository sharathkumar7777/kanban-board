import React from 'react';
import KanbanCard from './KanbanCard';

function KanbanColumn({ tickets, grouping }) {
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

  const groupedTickets = groupBy(grouping, tickets);

  return (
    <div className="kanban-columns">
      {Object.keys(groupedTickets).map(group => (
        <div className="kanban-column" key={group}>
          <h2>{group}</h2>
          {groupedTickets[group].map(ticket => (
            <KanbanCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanColumn;
