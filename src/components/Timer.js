import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Timer = ({ ticketId, cycles, onCycleComplete }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0
    });

    useEffect(() => {
        let interval;

        const fetchTimerState = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tickets/timer/${ticketId}`);
                setTimeLeft(response.data);

                if (response.data.totalMilliseconds <= 0) {
                    if (cycles > 0) {
                        console.log(cycles);
                        onCycleComplete(); // Call the onCycleComplete callback when the timer reaches zero and cycles are not exhausted
                    }
                }
            } catch (error) {
                console.error("Error fetching timer state", error);
            }
        };

        // Fetch the initial timer state when the component mounts
        fetchTimerState();

        // Set up an interval to periodically fetch timer data
        interval = setInterval(() => {
            fetchTimerState();
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [ticketId, cycles, onCycleComplete]);

    return (
        <div>
        {timeLeft.totalMilliseconds > 0 ? (
            <div>Countdown: {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds</div>
        ) : (
            <div></div>
        )}
    </div>
    );
};

export default Timer;
