// Profile page
import React, { useEffect, useState} from 'react';
// import { Link } from 'react-router-dom'
import { Container} from 'react-bootstrap'
import axios from 'axios';



const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null); // To store user info
    const [tickets, setTickets] = useState([]); // To store user's tickets


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/profile', { withCredentials: true });
                setUserInfo(response.data.user); // Set user info
                setTickets(response.data.tickets); // Set tickets
            } catch (err) {
                console.error("Error fetching profile", err);
            }
        };
        fetchProfile();
    }, []);

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:3000/tickets/${id}`);
    //         setTickets(tickets.filter(tickets => tickets._id !== id));
    //     } catch (error) {
    //         console.error("Error deleting post", error);
    //     }
    // };

    // const formatDate = (date) => {
    //     if (!date) return '';
    //     const dateObject = new Date(date);
    //     return dateObject.toLocaleDateString('en-AU', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit',
    //         hour12: true
    //     });
    // };

    return (
        <Container>
            {userInfo && (
                <div>
                    <h2>{userInfo.userName}</h2>
                    {tickets.map((ticket) => (
                        <div key={ticket._id}>
                            <h3>{ticket.task}</h3>
                            {/* Other ticket details */}
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}



export default ProfilePage

