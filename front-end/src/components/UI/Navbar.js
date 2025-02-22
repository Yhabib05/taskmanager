import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

const AppNavBar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" >
                <Container>
                    <Navbar.Brand as={Link} to="/Home">
                        Task Manager
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Home">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/task-lists">
                            Task Lists
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AppNavBar;