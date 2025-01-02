import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getTaskLists,
    getTaskListsByAuthor,
    getTaskListById,
    createTaskList,
    updateTaskList,
    deleteTaskList,
    getTaskListMembers, addUserToTaskList, deleteUserFromTaskList
} from '../../api/taskListApi';
import TaskListForm from "./TaskListForm";
import AppNavBar from "../UI/Navbar"
import ManageMembersModal from "../UI/ManageMembersModal";
import CloseButton from "react-bootstrap/CloseButton";
import ProgressBar from "react-bootstrap/ProgressBar"

import { Modal, Form, Spinner, Card, Button, Row, Col, Container } from "react-bootstrap";

const TaskLists = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [taskList, setTaskList] = useState(null);
    const [isAdding, setIsAdding] = useState(false); // State to toggle the TaskListForm visibility
    const [isUpdating , setIsUpdating] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [taskListMembers,setTaskListMembers] =useState([]);
    const [membersModal, setMembersModal] = useState({ show: false, taskListId: null });
    const [newMemberEmail,setNewMemberEmail]=useState("");
    const navigate =useNavigate();
    const [addMemberError,setAddMemberError]=useState("");
    const userEmail = localStorage.getItem('userEmail');


    useEffect(() => {
        fetchTaskListsByAuthor();
    }, []);

    /*
    const fetchTaskLists = async () => {
        setIsLoading(true);
        try{
            const { data } = await getTaskLists();
            setTaskLists(data);
        } catch (e){
            console.error("Error while fetching tasklists ",e);
        } finally {
            setIsLoading(false);
        }
    };
*/

    const fetchTaskListsByAuthor = async () => {

        setIsLoading(true);
        if (!userEmail) {
            console.error("User email not found. Ensure the user is logged in.");
            return;
        }
        try{
            const { data } = await getTaskListsByAuthor(userEmail);
            setTaskLists(data);
        } catch (e){
            console.error("Error while fetching tasklists for user ",e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (taskList) => {
        await createTaskList(taskList);
        setIsAdding(false);

        fetchTaskListsByAuthor();
    };

    const handleDelete = async (id) => {
        await deleteTaskList(id);
        setTaskList(null);
        fetchTaskListsByAuthor();
    };

    const handleGetById = async (id) => {
        setIsLoading(true);
        try{
            const {data} = await getTaskListById(id);
            setTaskList(data);
            //console.log("returning the task list details :", data);
            //console.log("list progress",data.progress);
            fetchTaskListsByAuthor();
        } catch(e){
            console.error("Error while fetching the taskList",e);

        } finally {
            setIsLoading(false);
        }

    }

    const handleNavigateToTasks = (taskListId) => {
        navigate(`/task-lists/${taskListId}/tasks`);
    };

    const handleUpdate = async (id,data) => {
        try {
            await updateTaskList(id, data);
            console.log(taskList);
            setIsUpdating(null);
            await fetchTaskListsByAuthor();
        }
        catch (error) {
            console.error('Error updating taskList:', error.response?.data || error.message); // Log server response
        }
    };

    const fetchTaskListMembers = async (taskListId) => {
        setIsLoading(true);
        try{
            const{data}=await getTaskListMembers(taskListId);
            setTaskListMembers(data);
        } catch(e){
            console.error("error fetching task list members: ",e);
        }
        finally {
            setIsLoading(false);
        }

    }

    const handleAddMember = async () => {
        try {
            const {data} = await addUserToTaskList(membersModal.taskListId, {email: newMemberEmail});
            setNewMemberEmail("");
            setAddMemberError("");
            fetchTaskListMembers(membersModal.taskListId);
        } catch (err) {
            if (err.response?.status === 404) {
                // Handle the "user not found" or "tasklist not found" error
                setAddMemberError(err.response?.data?.message || "User or tasklist not found");
            } else {
                // Log other unexpected errors
                console.error("Error adding member to task list:", err);
                setAddMemberError("An unexpected error occurred. Please try again.");
            }
        }
    }

    const handleRemoveMember = async (memberId) => {
        try {
            await deleteUserFromTaskList(membersModal.taskListId, memberId);
            fetchTaskListMembers(membersModal.taskListId);
        } catch (e) {
            console.error("Error removing member:", e);
        }
    };

    const handleShowMembersModal = (tasklistId) => {
        setMembersModal({show:true,taskListId:tasklistId});
        fetchTaskListMembers(tasklistId);
    };

    const handleCloseMembersModal = () => {
        setMembersModal({show:false,taskListId:null});
        //fetchTaskListMembers(tasklistId);
        //setTaskListMembers([]);
    };


    return (
        <div>
            <AppNavBar />
            <Container>
                <h1 className="text-center mt-4">Task Lists</h1>
                {isLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row className="mt-4">
                        {taskLists.map((list) => (
                            <Col key={list.id} md={4} className="mb-4">
                                <Card border="primary">
                                    <Card.Header as="h5" className="p-3 mb-2 bg-gradient-warning text-dark">{list.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {list.description || 'No description available.'}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Button
                                                variant="primary"
                                                onClick={() => handleNavigateToTasks(list.id)}
                                            >
                                                View Tasks
                                            </Button>
                                            <Button
                                                variant="warning"
                                                onClick={() => setIsUpdating(list.id)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(list.id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => handleGetById(list.id)}
                                            >
                                                Details
                                            </Button>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Button
                                                variant="info"
                                                onClick={() => handleShowMembersModal(list.id)}
                                            >
                                                Manage Members
                                            </Button>
                                        </div>
                                        <div className="mt-3">
                                            <ProgressBar now={list.progress * 100} label={`${list.progress * 100}%`}/>
                                        </div>
                                    </Card.Body>
                                </Card>
                                {isUpdating === list.id && (
                                    <TaskListForm
                                        onSubmit={(data) => handleUpdate(list.id, data)}
                                        onCancel={() => setIsUpdating(null)}
                                        initialData={{
                                            id: list.id,
                                            title: list.title,
                                            description: list.description
                                        }}
                                    />
                                )}
                            </Col>
                        ))}
                    </Row>
                )}
                {membersModal.show && (
                    <Modal show={membersModal.show} onHide={handleCloseMembersModal} centered size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Manage Members</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="mb-3" onSubmit={(e) => {
                                e.preventDefault(); // Prevent default form submission behavior
                                if (!newMemberEmail.trim()) {
                                    setAddMemberError("Email cannot be empty.");
                                    return;
                                }
                                handleAddMember(); // Only call handleAddMember when input is valid
                            }}>
                                <Form.Group controlId="newMemberEmail" className="mb-4">
                                    <Form.Label>Add Member</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter member's email"
                                        value={newMemberEmail}
                                        onChange={(e) =>{
                                            setNewMemberEmail(e.target.value);
                                            setAddMemberError("");
                                        }}
                                        required
                                    />
                                    {addMemberError && <small className="text-danger">{addMemberError}</small>}
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    //onClick={handleAddMember}
                                    type="submit"
                                >
                                    Add Member
                                </Button>
                            </Form>
                            <h5>Current Members</h5>
                            <ul className="list-group">
                                {taskListMembers.map((member) => (
                                    <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {member.email}
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveMember(member.id)}>Remove</Button>
                                    </li>
                                ))}
                            </ul>
                        </Modal.Body>
                    </Modal>
                )}
                {taskList && (
                    <div style={{
                        position: 'relative',
                        marginTop: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                    }}>
                        <CloseButton
                            onClick={() => setTaskList(null)}
                            style={{
                                position: 'absolute',
                                marginTop: '2px',
                                right: '5px',
                            }}
                        />
                        <h2>Task List Details</h2>
                        <p><strong>Title:</strong> {taskList.title}</p>
                        <p><strong>Description:</strong> {taskList.description}</p>
                        <p><strong>Count:</strong> {taskList.count}</p>
                        <p><strong>Progress:</strong> {taskList.progress}</p>
                    </div>
                )}

                <div className="mt-4">
                    {isAdding ? (
                        <TaskListForm
                            onSubmit={handleCreate}
                            onCancel={() => setIsAdding(false)}
                        />
                    ) : (
                        <Button onClick={() => setIsAdding(true)}>Add Task List</Button>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default TaskLists;