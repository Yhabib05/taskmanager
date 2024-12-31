import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTaskListsByMember } from "../../api/taskListApi";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import AppNavBar from "../UI/Navbar";

const TaskListsJoined = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchTaskListsByMember();
    }, []);

    const fetchTaskListsByMember = async () => {
        setIsLoading(true);
        try {
            if (!userEmail) {
                console.error("User email not found. Ensure the user is logged in.");
                return;
            }

            const { data } = await getTaskListsByMember(userEmail);
            setTaskLists(data);
        } catch (e) {
            console.error("Error fetching joined task lists:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToTasks = (taskListId) => {
        navigate(`/task-lists/${taskListId}/tasks`);
    };

    return (
        <div>
            <AppNavBar />
            <Container className="mt-4">
                <h1 className="text-center mb-4">Joined Projects</h1>
                {isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "70vh",
                        }}
                    >
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : taskLists.length > 0 ? (
                    <Row xs={1} sm={2} md={3} className="g-4">
                        {taskLists.map((list) => (
                            <Col key={list.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Header className="bg-primary text-white">
                                        <h5 className="mb-0">{list.title}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {list.description || "No description available."}
                                        </Card.Text>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => handleNavigateToTasks(list.id)}
                                        >
                                            View Tasks
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center mt-5">
                        <h4>No projects found</h4>
                        <p>It looks like you're not a member of any projects.</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default TaskListsJoined;
