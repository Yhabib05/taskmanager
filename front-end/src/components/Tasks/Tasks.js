import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import {getTasks, getTaskById, createTask, deleteTask, updateTask} from '../../api/taskApi';
import TaskForm from './TaskForm';
import AppNavBar from "../UI/Navbar"; // Import the TaskForm component

import CloseButton from 'react-bootstrap/CloseButton';
import {Spinner, Card, Button, Row, Col, Container, Modal, Form} from "react-bootstrap";
import {getTaskListById} from "../../api/taskListApi";

const Tasks = () => {
    // the useParams extract "task_list_id" from the route :<Route path="/task-lists/:task_list_id/tasks" element={<Tasks />} />
    const { task_list_id } = useParams(); // Extract the task_list_id from the URL
    const [taskListTitle, setTaskListTitle] = useState('');

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskForm visibility
    const [isUpdating, setIsUpdating] = useState(null);//we store the task id being updated
    const [isLoading,setIsLoading] = useState(false);
    const [isAddingWithStatus, setIsAddingWithStatus] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchTaskListTitle();
    }, [task_list_id]);

    const fetchTasks = async () => {
        setIsLoading(true);
        try{
            const { data } = await getTasks(task_list_id);
            setTasks(data);
        } catch(error){
            console.error("Error while fetching task data",error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchTaskListTitle = async () =>{
        try{
            const {data} = await getTaskListById(task_list_id);
            setTaskListTitle(data.title);
        } catch {
            console.error("tasklist title can't be fetched");
        }
    }

    const handleGetById =async (task_id) => {
        setIsLoading(true);
        try{
            const {data} = await getTaskById(task_list_id, task_id);
            setTask(data);
        } catch(error) {
            console.error("Error while fetching the task",error);
        } finally {
            setIsLoading(false);
        }

    }

    const handleCreate = async (taskData) => {
        // Use the TaskForm's onSubmit to create a task
        try {
            const response = await createTask(task_list_id, taskData);
            console.log("Response ; ",response.data);

            setIsAdding(false); // Close the form after submission
            await fetchTasks(); // Refresh the tasks list
        } catch(error){
            console.error("error while creating the task",error);
        }
    };

    const handleUpdate = async (newTaskData,id) =>{
        try {
            await updateTask(task_list_id, id, newTaskData);
            //console.log(task);
            setIsUpdating(null);
            await fetchTasks();
        }
        catch (error) {
            console.error('Error updating task:', error); // Log server response
        }
    };

    const handleDelete = async (id) => {
        await deleteTask(task_list_id, id);
        if (task && task.id===id){ //if the task we re seeing its details is the one we deleted, we need to remove it
            setTask(null);
        }
        await fetchTasks(); // Refresh the tasks list
    };

    const tasksByStatus = {
        OPEN: tasks.filter((task) => task.status === 'OPEN'),
        INPROCESS: tasks.filter((task) => task.status === 'INPROCESS'),
        CLOSED: tasks.filter((task) => task.status === 'CLOSED'),
    };

    return (
        <div>
            <AppNavBar />
            <Container>
                <h1 className="text-center mt-4">Tasks of <span style={{color: '#007bff'}}>{taskListTitle}</span> </h1>
                {isLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh', // Full height of the viewport
                        }}
                    >
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row className="mt-4">
                        {['OPEN', 'INPROCESS', 'CLOSED'].map((status)=>
                        (
                            <Col key={status} md={4} className="mb-4">
                                <div className="p-3 bg-dark text-white rounded-4 shadow">
                                    <h3 className="text-center text-success">{status}</h3>
                                    {tasksByStatus[status].length > 0 ? (
                                        tasksByStatus[status].map((task) => (
                                            <Card
                                                key={task.id}
                                                className="mb-3 bg-dark text-white rounded shadow-sm position-relative"
                                            >
                                                <div
                                                    style={{
                                                        height: '6px', // Height of the bar
                                                        width: '50px', // Width of the bar
                                                        backgroundColor:
                                                            task.priority === 'HIGH'
                                                                ? '#dc3545' // Red for high priority
                                                                : task.priority === 'MEDIUM'
                                                                    ? '#ffc107' // Yellow for medium priority
                                                                    : '#198754', // Green for low priority
                                                        borderRadius: '3px', // Rounded edges for the bar
                                                        margin: '10px auto', // Center the bar horizontally
                                                    }}
                                                ></div>
                                                <Card.Body>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description || 'No description available.'}
                                                    </Card.Text>
                                                    <p>
                                                        {/*<strong>Priority:</strong> {task.priority} <br/>*/}
                                                        <strong>Due Date:</strong> {task.dueDate || 'N/A'}
                                                    </p>
                                                    {/*<div className="task-user-circle bg-secondary text-center">
                                                        {task.assignedUserInitials || 'N/A'}
                                                    </div>*/}
                                                    <div className="d-flex justify-content-between">
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => setIsUpdating(task.id)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => handleGetById(task.id)}
                                                        >
                                                            Details
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDelete(task.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                    {isUpdating === task.id && (
                                                        <TaskForm
                                                            onSubmit={(newTaskData) => handleUpdate(newTaskData, task.id)}
                                                            onCancel={() => setIsUpdating(null)}
                                                            initialData={task}
                                                        />
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : (
                                        <>
                                            {isAddingWithStatus===status ? (
                                                /*
                                                                                            status is set by default to the one of the column, and the others are set by default also, the user can only choose title
                                                */
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleCreate({
                                                        title: e.target.elements.title.value,
                                                        description: e.target.elements.description.value,
                                                        status, // Predefined status for the column
                                                        priority: 'MEDIUM', // Default priority
                                                        dueDate: e.target.elements.dueDate.value, // Default due date
                                                    });
                                                    setIsAddingWithStatus(null);
                                                }}>
                                                    <Form.Group controlId="taskTitle" className="mb-3">
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter task title"
                                                            name="title"
                                                            //onChange={(e) => setTitle(e.target.value)}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="taskDescription" className="mb-3">
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={2}
                                                            placeholder="Enter task description"
                                                            name="description"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="taskDueDate" className="mb-3">
                                                        <Form.Label>Due Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="dueDate"
                                                            //onChange={(e) => setDueDate(e.target.value)}
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                    </Form.Group>
                                                    <div className="d-flex justify-content-between">
                                                        <Button type="submit" variant="primary">
                                                            Add a Task
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => setIsAddingWithStatus(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </Form>
                                            ) : (
                                                <Button variant="success" onClick={() => {
                                                    console.log(`the status is : ${status}`);
                                                    setIsAddingWithStatus(status)}
                                                }>
                                                    Add a Task
                                                </Button>
                                            )}
                                        </>

                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
                <div style={{ marginTop: '20px' }}>
                    {isAdding ? (
                        <TaskForm
                            onSubmit={handleCreate}
                            onCancel={() => setIsAdding(false)} // Close form on cancel
                        />
                    ) : (
                        <Button variant="success" onClick={() => setIsAdding(true)}>
                            Add Task
                        </Button>
                    )}
                </div>
            </Container>
            {task && (
                <Modal show={!!task} onHide={()=>setTask(null)} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>Task Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Task Details</h2>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <p><strong>Due Date:</strong> {task.dueDate || 'N/A'}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setTask(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
};

export default Tasks;