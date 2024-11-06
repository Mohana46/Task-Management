import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card'; // Ensure you import the correct Card component
import { Grid, Box } from '@mui/material';
import Header from '../components/Header'
import { useTheme } from '@mui/material/styles';

const InProgressTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    const fetchInProgressTasks = async () => {
      try {
        const response = await axios.get('https://task-management-nrvo.onrender.com/api/todos/get-task');
        // Filter tasks with status 'In Progress'
        const inProgressTasks = response.data.filter(task => task.status === 'In progress');
        setTasks(inProgressTasks);
      } catch (error) {
        console.error('There was an error fetching the tasks!', error);
        setError('Failed to fetch tasks. Please try again later.');
      }
    };

    fetchInProgressTasks();
  }, []);
  const handleStatusChange = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };  
  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', paddingTop: { xs: 2, lg: 2 } }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.paper,
          paddingTop: 8,
          paddingLeft: { xs: 2, md: 2 },
          paddingRight: { xs: 2, md: 2 },
        }}
      >{error && <p>{error}</p>}
      {tasks.length === 0 && !error && <p>No tasks in progress.</p>}
      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <Card 
            id={task._id}
              taskName={task.taskName} 
              status={task.status} 
              deadline={task.deadline}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete} 
            />
          </Grid>
        ))}
      </Grid>
        
      </Box>
    </Box>
  );
};

export default InProgressTask;
