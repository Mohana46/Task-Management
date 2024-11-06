import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import axios from 'axios';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import pendingImg from '../assets/Image/pending.jpg';
import inProgressImg from '../assets/Image/in_progress.jpg';
import completedImg from '../assets/Image/completed.webp';

export default function MediaCard({ id, taskName, status, deadline, onStatusChange, onDelete }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editedTaskName, setEditedTaskName] = React.useState(taskName);
  const [editedStatus, setEditedStatus] = React.useState(status);
  const [editedDeadline, setEditedDeadline] = React.useState(deadline);

  const getStatusColor = () => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'In progress':
        return 'yellow';
      default:
        return 'grey';
    }
  };

  const getStatusImage = () => {
    switch (status) {
      case 'Completed':
        return completedImg;
      case 'Pending':
        return pendingImg;
      case 'In progress':
        return inProgressImg;
      default:
        return pendingImg;
    }
  };

  const formattedDeadline = format(new Date(deadline), 'dd/MM/yy');

  const handleComplete = async () => {
    try {
      const response = await axios.put(`https://task-management-nrvo.onrender.com/api/todos/update-task/${id}`, {
        status: 'Completed'
      });
      onStatusChange(response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://task-management-nrvo.onrender.com/api/todos/delete-task/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://task-management-nrvo.onrender.com/api/todos/update-task/${id}`, {
        taskName: editedTaskName,
        status: editedStatus,
        deadline: editedDeadline
      });
      onStatusChange(response.data);
      setOpenEdit(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, position: 'relative', borderLeft: `4px solid ${getStatusColor()}`, height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={getStatusImage()}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {taskName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deadline: {formattedDeadline}
          </Typography>
        </CardContent>
        <CardActions >
          <Button size="small" onClick={handleComplete} disabled={status === 'Completed'}>
            Complete
          </Button>
          <Button size="small" onClick={() => setOpenEdit(true)}>
            Update
          </Button>
        </CardActions>
        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
          <IconButton size="small" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            variant="outlined"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            select
            SelectProps={{
              native: true,
            }}
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </TextField>
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
