import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications for the logged-in user
        axios.get(`${process.env.REACT_APP_APILINKS}/get-notifications`, { withCredentials: true })
            .then((res) => {
                setNotifications(res.data);
            })
            .catch((err) => {
                console.error('Error fetching notifications:', err);
            });
    }, []);

    const handleAccept = (notification) => {
        axios.post(`${process.env.REACT_APP_APILINKS}/accept-notification`, {
            notificationId: notification.id,
            senderEmail: notification.sender_email,
            receiverEmail: "currentUser@example.com" // Replace with the logged-in user's email
        }, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    alert('Connection accepted!');
                    setNotifications(notifications.filter((n) => n.id !== notification.id));
                }
            })
            .catch((err) => {
                console.error('Error accepting notification:', err);
            });
    };

    return (
        <Container>
            <h2>Notifications</h2>
            <List>
                {notifications.map((notification) => (
                    <ListItem key={notification.id}>
                        <ListItemText
                            primary={notification.message}
                            secondary={`From: ${notification.sender_email || 'N/A'}`}
                        />
                        {notification.status === 'pending' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAccept(notification)}
                            >
                                Accept
                            </Button>
                        )}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default NotificationsPage;
