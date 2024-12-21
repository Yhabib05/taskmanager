import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTaskLists, getTaskListById ,createTaskList, updateTaskList , deleteTaskList } from '../../api/taskListApi';
import TaskListForm from "./TaskListForm";
import AppNavBar from "../UI/Navbar"
import CloseButton from "react-bootstrap/CloseButton";

const TaskLists = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [taskList, setTaskList] = useState(null);
    //const [taskListTitle, setTaskListTitle] = useState('');
    //const [taskListDescription, setTaskListDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskListForm visibility
    const [isUpdating , setIsUpdating] = useState(null);
    const navigate =useNavigate();

    useEffect(() => {
        fetchTaskLists();
    }, []);

    const fetchTaskLists = async () => {
        const { data } = await getTaskLists();
        setTaskLists(data);
    };

    const handleCreate = async (taskList) => {
        //if (!taskListTitle.trim()) return;
        await createTaskList(taskList);
        setIsAdding(false);
        /*await createTaskList({ title: taskListTitle, description: taskListDescription });
        setTaskListTitle('');
        setTaskListDescription('');*/
        fetchTaskLists();
    };

    const handleDelete = async (id) => {
        await deleteTaskList(id);
        fetchTaskLists();
    };

    const handleGetById = async (id) => {
        const {data} = await getTaskListById(id);
        setTaskList(data);
        console.log("returning the task list details :", data);
        fetchTaskLists();
    }

    const handleNavigateToTasks = (taskListId) => {
        navigate(`/task-lists/${taskListId}/tasks`);
    };

    const handleUpdate = async (id,data) => {
        try {
            await updateTaskList(id, data);
            console.log(taskList);
            setIsUpdating(null);
            await fetchTaskLists();
        }
        catch (error) {
            console.error('Error updating taskList:', error.response?.data || error.message); // Log server response
        }
    };

    return (
        <div>
            <AppNavBar/>
            <h1>Task Lists</h1>
            <ul>
                {taskLists.map((list) => (
                    <li
                        key={list.id}
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            if (e.target.tagName !== 'LI') return; // Only navigate if the <li> itself is clicked
                            handleNavigateToTasks(list.id);
                        }}
                    >
                        <strong>{list.title}</strong>: {list.description}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from triggering navigation here also
                                handleDelete(list.id);
                            }}
                            style={{marginLeft: '10px'}}
                        >
                            Delete
                        </button>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleGetById(list.id);
                        }} style={{marginLeft: '10px'}}
                        >
                            Details
                        </button>
                        {isUpdating === list.id ? (
                            <div style={{marginTop: '20px'}}>
                                <TaskListForm
                                    onSubmit={(data)=>handleUpdate(list.id,data )}
                                    onCancel={() => setIsUpdating(null)}
                                    initialData={{
                                        id: list.id,
                                        title: list.title,
                                        description: list.description,
                                        //count: list.count,
                                        //progress: list.progress,
                                    }}
                                />
                            </div>
                        ) : (
                            <button onClick={(e) => {
                                e.stopPropagation();
                                setIsUpdating(list.id);
                            }} style={{marginLeft: '10px'}}
                            >Update TaskList</button>

                        )}
                    </li>
                ))}
            </ul>
            {taskList && (
                <div style={{
                    position: 'relative', //make this container the reference for absolute positioning
                    marginTop: '20px',
                    padding: '10px',
                    border: '1px solid #ccc'
                }}
                >
                    <CloseButton
                        onClick={() => setTaskList(null)}
                        style={{
                            position: 'absolute',//now we can use absolute
                            marginTop: '2px',
                            right: '5px',
                        }}
                    />
                    <h2>TaskList Details</h2>
                    <p><strong>Title:</strong> {taskList.title}</p>

                    <p><strong>Description:</strong> {taskList.description}</p>
                    <p><strong>Count:</strong> {taskList.count}</p>
                    <p><strong>Progress:</strong> {taskList.progress}</p>
                    <div>
                        <strong>Tasks:</strong>
                        {taskList.tasks && taskList.tasks.length >0 ? (
                            <ul>
                                {taskList.tasks.map((task) => (
                                    <li key={task.id}>
                                        <strong>Title:</strong> {task.title} <br/>
                                        <strong>Description</strong> {task.description} <br/>
                                        <strong>Priority</strong> {task.priority} <br/>
                                        <strong>Status</strong> {task.status} <br/>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                                <p>No tasks available</p>
                        )}
                    </div>
                </div>
                )}
            <div style={{marginTop: '20px'}}>
                {isAdding ? (
                    <TaskListForm
                        onSubmit={handleCreate}
                        onCancel={() => setIsAdding(false)}
                    />
                ) : (
                    <button onClick={() => setIsAdding(true)}>Add Task List</button>
                )}
            </div>
        </div>
    );
};

export default TaskLists;
