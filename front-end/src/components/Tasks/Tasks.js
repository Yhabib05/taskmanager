import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import {getTasks, getTaskById, createTask, deleteTask, updateTask} from '../../api/taskApi';
import TaskForm from './TaskForm';
import AppNavBar from "../UI/Navbar"; // Import the TaskForm component

import CloseButton from 'react-bootstrap/CloseButton';
import { Spinner, Card, Button, Row, Col, Container } from "react-bootstrap";
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
            await createTask(task_list_id, taskData);
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

    return (
        <div>
            <AppNavBar />
            <Container>
                <h1 className="text-center mt-4">Tasks</h1>
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
                        {tasks.map((task) => {
                            let cardBorderColor;
                            switch (task.priority) {
                                case 'LOW':
                                    cardBorderColor = 'success';
                                    break;
                                case 'MEDIUM':
                                    cardBorderColor = 'warning'; //yellow
                                    break;
                                case 'HIGH':
                                    cardBorderColor = 'danger'; //red
                                    break;
                                default :
                                    cardBorderColor = 'secondary'; //grey
                            }
                            return (
                                <Col key={task.id} md={4} className="mb-4">
                                    <Card border={cardBorderColor}>
                                        <Card.Header>{taskListTitle}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <Card.Text>
                                                {task.description || 'No description available.'}
                                            </Card.Text>
                                            <p>
                                                <strong>Priority:</strong> {task.priority} <br/>
                                                <strong>Due Date:</strong> {task.dueDate || 'N/A'}
                                            </p>
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
                                                <div style={{marginTop: '20px'}}>
                                                    <TaskForm
                                                        onSubmit={(newTaskData) => handleUpdate(newTaskData, task.id)}
                                                        onCancel={() => setIsUpdating(null)}
                                                        initialData={{
                                                            id: task.id,
                                                            title: task.title,
                                                            description: task.description,
                                                            priority: task.priority,
                                                            dueDate: task.dueDate,
                                                            status: task.status,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
                {task && (
                    <div
                        style={{
                            position: 'relative',
                            marginTop: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <CloseButton
                            onClick={() => setTask(null)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}
                        />
                        <h2>Task Details</h2>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <p><strong>Due Date:</strong> {task.dueDate || 'N/A'}</p>
                    </div>
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
        </div>
    );
};

export default Tasks;