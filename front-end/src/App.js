import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskLists from './components/TaskLists/TaskLists';
import Tasks from './components/Tasks/Tasks';
import NotFound from './components/NotFound/NotFound'

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<TaskLists />} />
            <Route path="/task-lists/:task_list_id/tasks" element={<Tasks />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
    </Router>
);

export default App;
