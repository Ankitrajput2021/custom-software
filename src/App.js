import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ViewPage from './ViewPage';
import EditJobSheet from './EditJobSheet'; // Import the new edit page
import NewJobSheet from './NewJobSheet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/:id" element={<ViewPage />} />
        <Route path="/edit/:id" element={<EditJobSheet />} /> {/* Edit Page Route */}
        <Route path="/new-jobsheet" element={<NewJobSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
