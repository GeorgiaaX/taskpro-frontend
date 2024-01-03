import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Timer from '../components/Timer'; 

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/tickets', { withCredentials: true });
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts", error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tickets/${id}`,  { withCredentials: true } );
            setPosts(posts.filter(post => post._id !== id));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const handleCycleComplete = async (postId) => {
        try {
            // Fetch the current post data
            const response = await axios.get(`http://localhost:3000/tickets/${postId}`,  { withCredentials: true });
    
            if (response.data) {
                const postToUpdate = response.data;
    
                // Check if cycles are not exhausted
                if (postToUpdate.cycleCount < postToUpdate.auctions) {
                    // Calculate new values for the post
                    const newValue = Number(postToUpdate.startCost) + (Number(postToUpdate.increment) * (Number(postToUpdate.cycleCount) + 1));
                    const newCycleCount = Number(postToUpdate.cycleCount) + 1;
                    const newDate = new Date().toISOString();
    
                    // Update the post data
                    const updatedPost = {
                        ...postToUpdate,
                        currentValue: String(newValue),
                        cycleCount: newCycleCount,
                        startTime: newDate,
                        newDate: newDate
                    };
    
                    // Update the post on the server
                    await axios.patch(`http://localhost:3000/tickets/${postId}`, updatedPost,  { withCredentials: true });
    
                    // Fetch the updated post data and set it in the local state
                    const updatedResponse = await axios.get(`http://localhost:3000/tickets/${postId}`,  { withCredentials: true });
                    if (updatedResponse.data) {
                        const updatedPostData = updatedResponse.data;
                        setPosts((prevPosts) =>
                            prevPosts.map((post) =>
                                post._id === postId ? { ...post, ...updatedPostData } : post
                            )
                        );
                       
                    }
                  
                }
            }
        } catch (error) {
            console.error("Error handling cycle completion", error);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString('en-AU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        <Container>
            <h1>Tickets</h1>
            <Row className="mt-4">
                {posts.map((post) => (
                    <Col md={4} className="mb-4" key={post._id}>
                        <Card style={{ width: '20rem', height: '375px' }}>
                            <Card.Body className = "mb-3 card-body-with-buttons">
                                <Card.Title>Task: {post.task}</Card.Title>
                                <Card.Text>Reward: ${Number(post.currentValue).toFixed(2)}</Card.Text>
                                <Card.Text>Description: {post.description}</Card.Text>
                                <Card.Text>Date: {formatDate(post.createdAt)}</Card.Text>
                                <Timer 
                                    ticketId={post._id}
                                    cycles={Number(post.auctions) - Number(post.cycleCount)} // Calculate remaining cycles
                                    onCycleComplete={() => handleCycleComplete(post._id)}
                                />
                                <Link to={`/tickets/${post._id}`}>
                                    <Button variant="primary" className="mr-2 mt-2">Read More</Button>
                                </Link>
                                <Button variant="danger" className="mr-2 mt-2" onClick={() => handleDelete(post._id)}>Delete</Button>
                                <Button variant="success" className="mr-2 mt-2" >Claim</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
