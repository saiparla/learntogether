import React, { useState } from 'react';
import { Container,Box, Card, CardContent, Typography, CardActions, Button, TextField, FormControl } from '@mui/material';
import NavBar from './signside/Navbar';
const teamMembers = [
  { name: 'Jones', position: 'Project Manager', email: 'jones@gmail.com', phone: '+911234569685' },
  { name: 'Chandana', position: 'Lead Developer', email: 'chandana@gmail.com', phone: '+987654321' },
  { name: 'Chaitanya', position: 'UX Designer', email: 'routhusrichaitanya@gmail.com', phone: '+919182654418' },
  { name: 'Manvith', position: 'Backend Developer', email: 'manvith@gmail.com', phone: '+789456123' },
  { name: 'Prasad', position: 'Frontend Developer', email: 'prasad@gmail.com', phone: '+159753852' },
  { name: 'Ganesh', position: 'DevOps Engineer', email: 'ganesh@gmail.com', phone: '+357951456' },
];

const ContactUs = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details Submitted:', userDetails);
  };

  return (
    <Box sx={{width: '100%'}}><NavBar/>
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <div style={{ 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: '1rem', // Space between cards
  justifyContent: 'center', // Center align cards in row
}}>
  
  {teamMembers.map((member, index) => (
    <Card 
      key={index} 
      style={{ 
        flex: '1 1 400px', // Ensures each card has a min width of 300px
        maxWidth: '600px', // Card width does not exceed 300px
        marginBottom: '1rem', 
        padding: '0.5rem', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        borderRadius: '8px', 
        backgroundColor: '#e3f2fd' 
      }}
    >
      <CardContent style={{ padding: '0.5rem' }}>
        <Typography 
          variant="h6" 
          style={{ fontWeight: 'bold', color: '#1565c0' }}
        >
          {member.name}
        </Typography>
        <Typography 
          color="textSecondary" 
          style={{ fontSize: '0.85rem', color: '#5e92f3', marginBottom: '0.25rem' }}
        >
          {member.position}
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '0.2rem', color: '#333' }}>
          Email: {member.email}
        </Typography>
        <Typography variant="body2" style={{ color: '#333' }}>
          Phone: {member.phone}
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" href={`mailto:${member.email}`} style={{ color: '#1565c0' }}>
          Email
        </Button>
        <Button size="small" href={`tel:${member.phone}`} style={{ color: '#1565c0' }}>
          Call
        </Button>
      </CardActions>
    </Card>
  ))}
</div>


      

      {/* User Contact Form */}
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Contact Us with Your Details
      </Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Message"
            multiline
            rows={4}
            name="message"
            value={userDetails.message}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default ContactUs;
