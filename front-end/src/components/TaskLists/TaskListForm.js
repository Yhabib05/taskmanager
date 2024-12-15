import React, { useState } from 'react';

const TaskListForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
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
            <button type="submit">Save</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default TaskListForm;
