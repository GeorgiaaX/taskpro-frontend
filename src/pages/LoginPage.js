import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, Container } from 'react-bootstrap'
import{ useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [user, setUser] = useState({
        //username
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    //handle changes to form input
    const handleChange = e => {
        setUser ({ ...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/login', user, { withCredentials: true })
            console.log("This is the user details:", response.data.user)
            navigate('/tickets') //redirect to tickets page on success
        } catch (err) {
            console.error(err)
        }
    }


    return(

        <Container>
            <h1>Login Page</h1>
            <Form onSubmit = {handleSubmit}>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type = "email"
                        name = "email"
                        placeholder = "Enter your email"
                        value = {user.email}
                        onChange = {handleChange}
                        required/>
                </Form.Group>
                <Form.Group className = 'mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type = "password"
                        name = "password"
                        placeholder = "Enter your password"
                        value = {user.password}
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

export default LoginPage