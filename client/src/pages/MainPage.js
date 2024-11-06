import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from '../components/TodoForm';
import Dialog from '@mui/material/Dialog';
import MediaCard from '../components/Card';
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-management-nrvo.onrender.com/api/todos/get-task');
        setTasks(response.data);
      } catch (error) {
        console.error('There was an error fetching the tasks!', error);
        setError('Failed to fetch tasks. Please try again later.');
      }
    };

    fetchTasks();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Filter out tasks with status "Completed" and sort by deadline in ascending order
  const filteredAndSortedTasks = tasks
    .filter(task => task.status !== 'Completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

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
      >
        {error && <p>{error}</p>}
        {filteredAndSortedTasks.length === 0 && !error && <p>No tasks available.</p>}
        <Grid container spacing={2} sx={{ padding: { lg: 2, xs: 0 } }}>
          {filteredAndSortedTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <MediaCard
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
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <TaskForm handleClose={handleClose} />
        </Dialog>
      </Box>
    </Box>
  );
};

export default MainPage;
