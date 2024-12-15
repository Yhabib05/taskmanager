import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { getTasks, getTaskById, createTask, deleteTask } from '../../api/taskApi';
import TaskForm from './TaskForm';
import AppNavBar from "../UI/Navbar"; // Import the TaskForm component

const Tasks = () => {
    // the useParams extract "task_list_id" from the route :<Route path="/task-lists/:task_list_id/tasks" element={<Tasks />} />
    const { task_list_id } = useParams(); // Extract the task_list_id from the URL
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskForm visibility

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
        fetchTasks(); // Refresh the tasks list
    };

    const handleDelete = async (id) => {
        await deleteTask(task_list_id, id);
        fetchTasks(); // Refresh the tasks list
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
                        <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                        <button onClick={()=>handleGetById(task.id)} style={{ marginLeft: '10px' }}>
                            Details
                        </button>
                    </li>
                ))}
            </ul>
            {task && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
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
