import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskLists from './components/TaskLists/TaskLists';
import Tasks from './components/Tasks/Tasks';
import Users from './components/Users/Users'
import NotFound from './components/NotFound/NotFound'
import Home from './pages/Home'

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task-lists" element={<TaskLists />} />
            <Route path="/task-lists/:task_list_id/tasks" element={<Tasks />} />
            <Route path="/utilisateurs" element={<Users />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route that are not specified above */}
        </Routes>
    </Router>
);

export default App;
