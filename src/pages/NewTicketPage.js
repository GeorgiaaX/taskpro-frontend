import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewTicketPage = () => {
    //initialise state for the ticket
    const [ticket, setTicket] = useState({
        //name
        task: '',
        //description
        description: '',
        //start value
        startCost: '',
        //maxcost
        maxReward: '',
        //timer value - might be the same as duration
        timer: '',
        //increment value - caluclated
        increment: '',
        //number of auctions
        auctions: '0',
        //count current cycle number
        cycleCount: '0',
        //current value bacsed on cyclecount and increment
        currentValue: '',
    });

    const navigate = useNavigate();

    //handle any changes to the form input
    const handleChange = e => {
        const { name, value } = e.target;
        let newTicket = { ...ticket, [name]: value };

            //calculate increment value if maxreward or auctions change
        if (name === 'maxReward' || name === 'auctions') {
            const incrementValue = calculateIncrement(newTicket.startCost, newTicket.maxReward, newTicket.auctions);
            newTicket = { ...newTicket, increment: incrementValue };
        }

        //update current value when startcost changes
        if (name === 'startCost') {
            newTicket = { ...newTicket, currentValue: value };
        }

        setTicket(newTicket);
    };

    //caluclated increment based on startcost, maxreward and auctions
    const calculateIncrement = (startCost, maxReward, auctions) => {
        const start = Number(startCost);
        const max = Number(maxReward);
        const numAuctions = Number(auctions);
        return numAuctions > 0 ? ((max - start) / numAuctions).toFixed(2) : "0";
    };

    //handle form submission
    const handleSubmit = async e => {
        e.preventDefault();

        //prepare ticket data for submission
        const updatedTicket = {
            ...ticket,
            startTime: new Date().toISOString(), //set the timer's start time to now
            duration: Number(ticket.timer) //covert timer duration to a number
        };

        try {
            //submit the new ticket to the backend
            await axios.post('http://localhost:3000/tickets', updatedTicket, {withCredentials: true});
            navigate('/tickets'); //redirect to tickets page on success
        } catch (error) {
            console.error(`An error has occurred: ${error}`);
        }
    };

            //calculate cost per auction
            const calculateCostPerAuction = () => {
                        const startCost = Number(ticket.startCost);
                        const maxReward = Number(ticket.maxReward);
                        const auctions = Number(ticket.auctions);
                        if (auctions > 0) {
                            return ((maxReward - startCost) / auctions).toFixed(2);
                        }
                        return startCost.toFixed(2);
                    };

            //determine if auction input should be disabled if no value is in max reward
            const isAuctionDisabled = () => !ticket.maxReward || Number(ticket.maxReward) < Number(ticket.startCost);

    //render tool tip for auction explanation
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Each auction's cost is calculated based on the starting cost, the maximum cost, and the total number of auctions.
        </Tooltip>
    );

    //render timer options for dropdown
    const renderTimerOptions = () => {
        const options = [
            { value: "1", label: "1 min" },
            { value: "60", label: "1 hr" },
            { value: "360", label: "6 hrs" },
            { value: "720", label: "12 hrs" },
            { value: "1440", label: "24 hrs" }
        ];
        return options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>);
    };

        //render the form for creating a ticket
            return (
                        <Container>
                            <h1>Test components</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="task"
                                        placeholder="Enter a task"
                                        value={ticket.task}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        placeholder="Enter a task description"
                                        value={ticket.description}
                                        maxLength={100}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Start Cost</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                name="startCost" 
                                                placeholder="Enter Starting Cost" 
                                                value={ticket.startCost}
                                                onChange={handleChange}
                                                required 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Maximum Cost</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                name="maxReward" 
                                                placeholder="Enter Maximum Cost"
                                                value={ticket.maxReward}
                                                onChange={handleChange} 
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={9}>
                                        <Form.Group>
                                            <Form.Label>Number of Auctions</Form.Label>
                                            <Form.Range
                                                min="0"
                                                max="3"
                                                name="auctions"
                                                value={ticket.auctions}
                                                onChange={handleChange}
                                                disabled={isAuctionDisabled()}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Control 
                                            className = "mt-3"
                                            type="number"
                                            name="auctionsInput"
                                            value={ticket.auctions}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <h6>Auction Summary</h6>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                        >
                                        <ListGroup>
                                            <ListGroup.Item>
                                                Starting Cost: ${Number(ticket.startCost).toFixed(2)}
                                            </ListGroup.Item>
                                            {[1, 2, 3].map(auctionNumber => {
                                                const isDisabled = Number(ticket.auctions) < auctionNumber;
                                                return (
                                                    <ListGroup.Item 
                                                        key={auctionNumber}
                                                        disabled={isDisabled}
                                                        style={isDisabled ? { color: '#6c757d', backgroundColor: '#e9ecef' } : {}}
                                                    >
                                                        Auction {auctionNumber}: 
                                                        ${Number(ticket.auctions) >= auctionNumber ? 
                                                          (Number(calculateCostPerAuction()) * auctionNumber + Number(ticket.startCost)).toFixed(2) 
                                                          : '0.00'}
                                                    </ListGroup.Item>
                                                );
                                            })}
                                        </ListGroup>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Timer</Form.Label>
                                    <Form.Select id="timer" name="timer" onChange={handleChange} value={ticket.timer} required>
                                        <option>Choose a time length</option>
                                        {renderTimerOptions()}
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mb-4">Create Ticket</Button>
                            </Form>
                            <div style={{ height: 250 }}></div>
                        </Container>
                    );
}


export default NewTicketPage;