import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { authLogin } from '../../services/auth/loginService';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginstate, setLogin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const validateForm = () => {
        if (username.length <= 0) {
            setShowToast(true);
            setToastMessage("Username should be more than 1 character");
            return false;
        }
        if (password.length < 8) {
            setShowToast(true);
            setToastMessage("Password must be of at least 8 characters");
            return false;
        }
        return username.length > 0 && password.length >= 8;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return false;
        }
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await authLogin({ username, password });
        if (response && typeof response !== 'string' && response.access && response.refresh) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            localStorage.setItem('verified', false);
            setLogin(true);
        } else {
            setShowToast(true);
            setToastMessage(response);
        }
    }

    if (loginstate) {
        return <Redirect to={{
            pathname: '/auth/totpAuth'
        }}
        />
    }
    else {
        return (
            <div className="Login">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Incorrect details</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>Login Form</h1><br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                value={username}
                                placeholder="Enter your username/email"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="password">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <div className="col-sm-3 col-md-3 col-lg-3 mx-auto text-center">
                        <Button block type="submit">
                            Login
                        </Button>
                    </div>
                    <br />
                </Form>
            </div>
        );
    }
}

export default Login;
