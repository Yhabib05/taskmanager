import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [id] = useState(initialData.id || null); // Preserve the ID if provided
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 'MEDIUM');
    const [status, setStatus] = useState(initialData.status || 'OPEN'); // Default status

    const [dueDate, setDueDate] = useState(initialData.dueDate || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id, title, description, priority, dueDate, status });
        // Reset fields only for new task creation only, not the update
        if (!id) {
            setTitle('');
            setDescription('');
            setPriority('MEDIUM');
            setDueDate('');
            setStatus('OPEN');
        }
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
            <div>
                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>
            <button type="submit">Save</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
