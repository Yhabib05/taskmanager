import React, { useEffect, useState } from 'react';
import { getTaskLists, createTaskList, deleteTaskList } from '../../api/taskListApi';
import TaskListForm from "./TaskListForm";


const TaskLists = () => {
    const [taskLists, setTaskLists] = useState([]);
    //const [taskListTitle, setTaskListTitle] = useState('');
    //const [taskListDescription, setTaskListDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskListForm visibility

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

    return (
        <div>
            <h1>Task Lists</h1>
            <ul>
                {taskLists.map((list) => (
                    <li key={list.id}>
                        <strong>{list.title}</strong>: {list.description}
                        <button onClick={() => handleDelete(list.id)} style={{marginLeft: '10px'}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div style={{marginTop: '20px'}}>
                {isAdding ? (
                    <TaskListForm
                        onSubmit={handleCreate}
                        onCancel={()=>setIsAdding(false)}
                        />
                ): (
                    <button onClick={()=> setIsAdding(true)}>Add Task List</button>
                )}
            </div>
        </div>
            );
};

export default TaskLists;
