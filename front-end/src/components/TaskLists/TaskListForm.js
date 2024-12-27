import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const TaskListForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [id] = useState(initialData.id || null); // Preserve the ID if provided
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const authorEmail = localStorage.getItem('userEmail');
    //const [author, setAuthor] = useState(initialData.author );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id, title, description, author:{email:authorEmail} });
        if (!id) {
            setTitle('');
            setDescription('');
        }
    };



    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="taskListTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task list title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="taskListDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter tasklist description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button
                        variant= "primary"
                        type="submit">
                        Save
                    </Button>
                    {onCancel && <Button
                        variant="secondary"
                        type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    }
                </div>
            </Form>
        </Container>
    );
};

export default TaskListForm;
