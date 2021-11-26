import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { fetchUser, totpAuth } from '../../services/auth/loginService';

const TOTPAuth = () => {
    const [totp, setTotp] = useState("");
    const [loginstate, setLogin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const validateForm = () => {
        if (totp.length !== 6) {
            setShowToast(true);
            setToastMessage("OTP should be of length 6");
            return false;
        }
        if (!totp.match(RegExp(/[0-9]{6}/))) {
            setShowToast(true);
            setToastMessage("OTP must consist of 6 numeric digits");
            return false;
        }
        return totp.length === 6 && totp.match(RegExp(/[0-9]{6}/))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return false;
        }
        const totp = document.getElementById("totp").value;
        const response = await totpAuth({ totp });
        if (response && typeof response !== 'string' && response.access && response.refresh) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            localStorage.setItem('verified', true);
            const user = await fetchUser();
            localStorage.setItem('user', JSON.stringify(user));
            setLogin(true);
        } else {
            setShowToast(true);
            setToastMessage(response);
        }
    }

    if (loginstate) {
        return <Redirect to={{
            pathname: '/',
            state: { refresh: true }
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
                }}>2-F Authentication</h1><br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="totp">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={totp}
                                placeholder="Enter 6 digit OTP"
                                onChange={(e) => setTotp(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <div className="col-sm-3 col-md-3 col-lg-3 mx-auto text-center">
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                    <br />
                </Form>
            </div>
        );
    }
}

export default TOTPAuth;
