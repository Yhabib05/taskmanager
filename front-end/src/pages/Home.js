import React from 'react';
import AppNavBar from "../components/UI/Navbar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myProjects from "../assets/images/myProjects.svg";
import collaborate from "../assets/images/collaborate.svg";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>

            <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome to the Task Manager</h1>
                <p style={{fontSize: '1.2rem', color: '#555'}}>
                    We help you start Organizing your tasks effectively
                </p>

                {/* Flex Container */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "40px",
                        marginTop: "40px",
                        padding: '0 20px',
                    }}
                >
                    {/* Card 1: My Projects */}
                    <div
                        style={{
                            maxWidth: "500px",
                            textAlign: "center",
                            flex: "1",
                            display: "flex",
                            flexDirection: "column", // Makes content stack vertically
                            justifyContent: "space-between",
                        }}
                    >
                        <img
                            src={myProjects}
                            alt="My Projects"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                marginBottom: "20px",
                            }}
                        />
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4A90E2' }}>My projects</h2>
                        <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
                            Here we gather all of your projects, so you can create new tasks, assign them to members, and follow their evolution in real time
                        </p>
                        <Button
                            onClick={() => navigate('/task-lists')}
                            style={{
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 30px',
                                fontSize: '1rem',
                                borderRadius: '5px',
                                marginTop: '15px',
                            }}
                        >
                            My projects
                        </Button>
                    </div>

                    {/* Card 2: Projects Joined */}
                    <div
                        style={{
                            maxWidth: "500px",
                            textAlign: "center",
                            flex:"1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <img
                            src={collaborate}
                            alt="Projects Joined"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                marginBottom: "20px",
                            }}
                        />
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4A90E2' }}>Joined Projects</h2>
                        <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
                            Here you can find the projects you joined, the tasks you were assigned to, and update them in real time, for better collaborative work
                        </p>
                        <Button
                            onClick={() => navigate('/Joined-Tasklists')}
                            style={{
                                backgroundColor: '#20c997',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 30px',
                                fontSize: '1rem',
                                borderRadius: '5px',
                                marginTop: '15px',
                            }}
                        >
                            Joined Projects
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
