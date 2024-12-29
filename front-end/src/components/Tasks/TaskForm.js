import React, { useState } from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';

const TaskForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [id] = useState(initialData.id || null); // Preserve the ID if provided
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 'MEDIUM');
    const [status, setStatus] = useState(initialData.status || 'OPEN'); // Default status
    //const [error,setError]=useState('')
    const [dueDate, setDueDate] = useState(initialData.dueDate || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id, title, description, priority, dueDate, status });
        /*
        const today = new Date().toISOString().split('T')[0];
        if (dueDate && dueDate < today) {
            setError('Due date cannot be in the past.');
            return; // Prevent submission if the date is invalid
        }

        setError(''); // Clear any existing errors
        */

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
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="taskTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="taskDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="taskPriority" className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="NONE">None</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="taskDueDate" className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </Form.Group>

                    </Col>
                </Row>
                <Form.Group controlId="taskStatus" className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">Open</option>
                        <option value="INPROCESS">In Process</option>
                        <option value="CLOSED">Closed</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    {onCancel && (
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </Form>
        </Container>
    );
};

export default TaskForm;