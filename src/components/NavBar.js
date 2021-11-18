import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../logo.svg';
import { LinkContainer } from "react-router-bootstrap";
import Logout from "./auth/Logout";

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">

            <Navbar.Brand as={Link} to="/">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                Voting Dapp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto container-fluid">
                    {localStorage.getItem('verified') === 'true' ?
                        (<LinkContainer to="/auth/addDevice">
                            <Nav.Link>Add Device</Nav.Link>
                        </LinkContainer>
                        )
                        :
                        (<LinkContainer to="/auth/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>)}
                        <LinkContainer to="/elections/">
                            <Nav.Link>Elections</Nav.Link>
                        </LinkContainer>
                    <NavDropdown
                        className="mx-auto"
                        title="Menu"
                        id="dropdown-menu-align-right"
                        style={{ marginRight: "2em" }}
                    >
                        <NavDropdown.Item>{`${localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user')).username !== '' ? 'Verified' : 'Anonymous'} User`}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {localStorage.getItem("accessToken") !== null ? (
                            <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>) : (<NavDropdown.Item href="/auth/login">Login</NavDropdown.Item>)}
                    </NavDropdown>
                    {localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user')).username !== '' ?
                        (<Navbar.Text>
                            Signed in as: {JSON.parse(localStorage.getItem('user')).username}
                        </Navbar.Text>)
                        : ((<Navbar.Text>
                            Signed in as: Anonymous User
                        </Navbar.Text>))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
