import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { login } from '../api/userApi';
import {useNavigate} from "react-router-dom";
import Logo from "../assets/images/Task Manager.png";

import BackgroundImage from "../assets/images/undraw_login.svg";

const Login = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate =useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(`Username :${inputUsername}, Password :${inputPassword}`);
        try{
            await login({
                email:inputUsername,
                password:inputPassword
            });
            handleNavigateToHome();
        } catch(err) {
            if (err.response?.data?.message === "No user found with this email" ||
                err.response?.data?.message === "Wrong password") {
                setError(err.response?.data?.message);
            } else {
                setError("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePassword = () => {};

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleNavigateToHome = () => {
        navigate(`/Home`);
    };

    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                {/* Header */}
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    src={Logo}
                    alt="Task Manager Logo"
                />
                <div className="h4 mb-2 text-center">Sign In</div>
                {/* ALert */}
                {error ? (
                    <Alert
                        className="mb-2"
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        {error}
                    </Alert>
                ) : (
                    <div />
                )}
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={inputUsername}
                        placeholder="Enter your email"
                        onChange={(e) => setInputUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={inputPassword}
                        placeholder="Password"
                        onChange={(e) => setInputPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="checkbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Log In
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" >
                        Logging In...
                    </Button>
                )}
                <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handlePassword}
                    >
                        Forgot password?
                    </Button>
                </div>
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Task Manager | &copy;2024
            </div>
        </div>
    );
};

export default Login;
