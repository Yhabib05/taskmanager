import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import {getTasks, getTaskById, createTask, deleteTask, updateTask} from '../../api/taskApi';
import TaskForm from './TaskForm';
import AppNavBar from "../UI/Navbar"; // Import the TaskForm component

import CloseButton from 'react-bootstrap/CloseButton';





const Tasks = () => {
    // the useParams extract "task_list_id" from the route :<Route path="/task-lists/:task_list_id/tasks" element={<Tasks />} />
    const { task_list_id } = useParams(); // Extract the task_list_id from the URL
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskForm visibility
    const [isUpdating, setIsUpdating] = useState(null);//we store the task id being updated

    useEffect(() => {
        fetchTasks();
    }, [task_list_id]);

    const fetchTasks = async () => {
        const { data } = await getTasks(task_list_id);
        setTasks(data);
    };

    const handleGetById =async (task_id) => {
        const {data} = await getTaskById(task_list_id, task_id);
        setTask(data);
    }

    const handleCreate = async (taskData) => {
        // Use the TaskForm's onSubmit to create a task
        await createTask(task_list_id, taskData);
        setIsAdding(false); // Close the form after submission
        await fetchTasks(); // Refresh the tasks list
    };

    const handleUpdate = async (newTaskData,id) =>{
        try {
            await updateTask(task_list_id, id, newTaskData);
            console.log(task);
            setIsUpdating(null);
            await fetchTasks();
        }
        catch (error) {
            console.error('Error updating task:', error.response?.data || error.message); // Log server response
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
            <AppNavBar/>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> (Priority: {task.priority}, Due: {task.dueDate || 'N/A'})
                        <p>{task.description}</p>
                        <button onClick={() => handleDelete(task.id)} style={{marginLeft: '10px'}}>
                            Delete
                        </button>
                        <button onClick={() => handleGetById(task.id)} style={{marginLeft: '10px'}}>
                            Details
                        </button>
                            {isUpdating === task.id ? (
                                <div style={{marginTop: '20px'}}>
                                <TaskForm
                                    onSubmit={(newTaskData)=>handleUpdate(newTaskData, task.id)}
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
                            ) : (
                                <button onClick={() => setIsUpdating(task.id)}>Update Task</button>

                            )}


                    </li>
                ))}
            </ul>
            {task && (
                <div style={{
                    position: 'relative', //make this container the reference for absolute positioning
                    marginTop: '20px',
                    padding: '10px',
                    border: '1px solid #ccc'
                }}
                >
                    <CloseButton
                        onClick={()=>setTask(null)}
                        style={{
                            position: 'absolute',//now we can use absolute
                            marginTop: '2px',
                            right: '5px',
                        }}
                    />
                    <h2>Task Details</h2>
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
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
                    <button onClick={() => setIsAdding(true)}>Add Task</button>
                )}
            </div>
        </div>
    );
};

export default Tasks;
