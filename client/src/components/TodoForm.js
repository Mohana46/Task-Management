import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  FormControl,
  TextField,
  createTheme,
  ThemeProvider,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const theme = createTheme();

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In progress" },
];

const TodoForm = ({ handleClose }) => {
  const [formValues, setFormValues] = useState({
    taskName: "",
    status: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.taskName || !formValues.status || !formValues.deadline) {
      return;
    }

    try {
      
      await axios.post('https://task-management-nrvo.onrender.com/api/todos/add-task', formValues);
      console.log('Task added successfully:', formValues);
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: 3, position: 'relative' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ADD TASK
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Task Name"
                      variant="outlined"
                      fullWidth
                      name="taskName"
                      value={formValues.taskName}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={formValues.status}
                        onChange={handleInputChange}
                        label="Status"
                        required
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Deadline"
                      variant="outlined"
                      fullWidth
                      name="deadline"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formValues.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2, width: '100%' }}
                  >
                    ADD TASK
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default TodoForm;


// import React, { useState } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   MenuItem,
//   InputLabel,
//   Select,
//   CardActions,
//   Button,
//   FormControl,
//   TextField,
//   createTheme,
//   ThemeProvider,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';

// const theme = createTheme();

// const statusOptions = [
//   { label: "Pending", value: "pending" },
//   { label: "In Progress", value: "in progress" },
// ];

// const TodoForm = ({ handleClose }) => {
//   const [formValues, setFormValues] = useState({
//     taskName: "",
//     status: "",
//     deadline: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formValues.taskName || !formValues.status || !formValues.deadline) {
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/api/todos/add-task', formValues);
//       console.log(response.data);
//       handleClose(); 
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container justifyContent="center" spacing={2}>
//         <Grid item xs={12}>
//           <Card sx={{ padding: 3, position: 'relative' }}>
//             <IconButton
//               onClick={handleClose}
//               sx={{
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 ADD TASK
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Task Name"
//                       variant="outlined"
//                       fullWidth
//                       name="taskName"
//                       value={formValues.taskName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControl variant="outlined" fullWidth>
//                       <InputLabel id="status-label">Status</InputLabel>
//                       <Select
//                         labelId="status-label"
//                         id="status"
//                         name="status"
//                         value={formValues.status}
//                         onChange={handleInputChange}
//                         label="Status"
//                         required
//                       >
//                         {statusOptions.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Deadline"
//                       variant="outlined"
//                       fullWidth
//                       name="deadline"
//                       type="date"
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       value={formValues.deadline}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Grid>
//                 </Grid>
//                 <CardActions>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     sx={{ marginTop: 2, width: '100%' }}
//                   >
//                     ADD TASK
//                   </Button>
//                 </CardActions>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default TodoForm;

