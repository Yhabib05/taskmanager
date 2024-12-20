import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 'MEDIUM');
    const [dueDate, setDueDate] = useState(initialData.dueDate || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, priority, dueDate });
        setTitle('');
        setDescription('');
        setPriority('MEDIUM');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="NONE">None</option>
                </select>
            </div>
            <div>
                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button type="submit">Save</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
