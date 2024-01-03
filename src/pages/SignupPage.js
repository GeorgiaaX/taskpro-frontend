import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const [user, setUser] = useState({
        //username
        userName: '',
        //email
        email: '',
        //password
        password: '',
    });

    const navigate = useNavigate();

    //hangle changes to form input
    const handleChange = e => {
        const {name, value} = e.target;
        let newUser = {...user, [name]: value}
        setUser(newUser)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/signup', user)
            navigate('/tickets') //redirect to tickets page on success
        } catch (err) {
            console.error(err)
            // setError('An error occurred during signup')
        }
    }

    return(

        <Container>
            <h1>Sign Up Page</h1>
            <Form onSubmit = {handleSubmit}>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "userName"
                        placeholder = "enter a username"
                        value = {user.username}
                        onChange = {handleChange}
                        required/>
                </Form.Group>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type = "email"
                        name = "email"
                        placeholder = "enter your email"
                        value = {user.email}
                        onChange = {handleChange}
                        required/>
                </Form.Group>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type = "password"
                        name = "password"
                        placeholder = "enter your password"
                        value = {user.password}
                        onChange = {handleChange}
                        required/>
                </Form.Group>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type = "password"
                        name = "confirmPassword"
                        placeholder = "confirm your password"
                        value = {user.confirmPassword}
                        onChange = {handleChange}
                        required/>
                </Form.Group>
                <Button variant = "primary"
                    type = "submit"
                    className = "mb-4">Create Profile</Button>
            </Form>
            <div style = {{ height: 250 }}></div>
        </Container>
    )
}

export default SignupPage