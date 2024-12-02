import React, { useState } from "react";

const AddTaskModal = ({ users, onTaskAdd, onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState(users[0] ? users[0].id : "");
  const [taskStatus, setTaskStatus] = useState("in-progress");  // Default status
  const [taskPriority, setTaskPriority] = useState("medium");  // Default priority

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      assignedTo: assignedUser,
      status: taskStatus,
      priority: taskPriority,
    };
    onTaskAdd(newTask);
    onClose(); // Close the modal after task is added
  };

  return (
    <div className="modal-content show">
      <div className="modal-header">
        <h2>Add New Task</h2>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedUser">Assign User</label>
          <select
            id="assignedUser"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taskPriority">Priority</label>
          <select
            id="taskPriority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskModal;
