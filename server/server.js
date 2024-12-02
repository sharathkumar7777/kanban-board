const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000; // or any port you choose

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Sample task data (in-memory for now)
let tasks = [
  { id: 1, title: 'Sample Task 1', status: 'Todo', priority: 1, user: 'John Doe' },
  { id: 2, title: 'Sample Task 2', status: 'In Progress', priority: 3, user: 'Jane Smith' }
];

// API to fetch tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API to add a new task
app.post('/api/tasks', (req, res) => {
  const { title, status, priority, user } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    status,
    priority,
    user
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
