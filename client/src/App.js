import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  Box } from '@mui/material';
//import Header from './components/Header';
import PendingTask from './pages/PendingTask';
import InProgressTask from './pages/In-ProgressTask';
import CompletedTask from './pages/CompletedTask';
import MainPage from './pages/MainPage'
function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/Pending-Task" element={<PendingTask />} />
            <Route path="/In-Progress-Task" element={<InProgressTask />} />
            <Route path="/Completed-Task" element={<CompletedTask />} />
          </Routes>
      </Box>
    </Router>
  );
}

export default App;
