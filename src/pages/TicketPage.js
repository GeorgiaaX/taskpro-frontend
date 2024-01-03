import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import Timer from '../components/Timer'



const TicketPage = () => {
    const [post, setPost] = useState({
        title: '',
        user: '',
        value: '',
        task: ''
    })


    const {id} = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            console.log('request sent')
            const res = await axios.get(`http://localhost:3000/tickets/${id}`)
            setPost(res.data)
        }

        fetchPost()
    }, [id])

    //format date for AUS
    const formatDate = (date) => {
        if (!date) return ''; // Handle undefined or null dates
        const dateObject = new Date(date); //create new date object to use JS for formatting
        return dateObject.toLocaleDateString('en-AU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true //set to false for 24 hours
        });
    };




    return(
        <Container className = "mt-4">
            <h1>Task</h1>
            <Card style = {{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className = "mb-2 text-muted">{post.user}</Card.Subtitle>
                    <Card.Text>{post.task}</Card.Text>
                    <Card.Text>${post.value}</Card.Text>
                    <Card.Text>Date: {formatDate(post.createdAt)}</Card.Text>
                    <Timer 
                        timerValue = {post.timer}
                        createdDate = {post.createdAt}
                  />
                </Card.Body>
            </Card>
        </Container>
    )
}

export default TicketPage;