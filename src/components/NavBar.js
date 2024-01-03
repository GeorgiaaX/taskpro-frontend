import React from 'react'
import { Navbar, Nav }  from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'








const NavBar = () => {

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout');
            // Redirect to login or home page after successful logout
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
            // Handle logout error (e.g., display a message)
        }
    };


    const navigate = useNavigate()

    return(
        <Navbar bg="dark" variant = "dark" expand='lg' className = 'px-3'>
            <LinkContainer to='/tickets'>
                <Navbar.Brand>TaskPro</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls = 'basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className = "ml-auto">
                    <LinkContainer to="/tickets">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/tickets/new">
                        <Navbar.Brand>Create Ticket</Navbar.Brand>
                    </LinkContainer>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;