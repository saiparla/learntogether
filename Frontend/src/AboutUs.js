import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from './signside/Navbar';

// Custom styled component for hero section
const HeroSection = styled('div')({
  backgroundColor: '#f5f5f5',
  padding: '50px 0',
  textAlign: 'center',
});

const AboutUs = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <NavBar />
      <Container>
        
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h3" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" component="p" color="textSecondary">
            We are a team of passionate individuals committed to delivering excellence and driving innovation. 
            Our mission is to make a difference in the lives of our users by providing exceptional products and services.
          </Typography>
        </HeroSection>

        {/* Our Story Section */}
        <section style={{ padding: '40px 0' }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" paragraph>
            Founded in 2024, we have grown into a dedicated team of professionals who strive to bring innovation to 
            every project. With a commitment to quality and continuous improvement, we aim to exceed expectations and 
            create meaningful experiences for our users.
          </Typography>
        </section>

        {/* Team Section */}
        <section style={{ padding: '40px 0' }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'Mary', title: 'CEO', image: 'girl.jpg' },
              { name: 'Chaitanya', title: 'CTO', image: 'boy2.jpg' },
              { name: 'Prasad', title: 'Lead Developer', image: 'boy3.jpg' },
              // Add more team members as needed
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {member.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Values Section */}
        <section style={{ padding: '40px 0' }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Values
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: 'Innovation', description: 'We strive to stay ahead of the curve, fostering a culture of creativity and curiosity.' },
              { value: 'Integrity', description: 'We believe in honesty, transparency, and accountability in all that we do.' },
              { value: 'Excellence', description: 'We are committed to delivering outstanding results with each and every project.' },
              // Add more values as needed
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: '#3f51b5' }}>
                      {item.value.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </Box>
  );
};

export default AboutUs;
