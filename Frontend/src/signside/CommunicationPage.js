import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Box, Card, CardContent, CardMedia, Typography, Accordion, AccordionSummary,
  AccordionDetails, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from './Navbar';
import axios from 'axios';

const CommunicationPage = () => {
  const [data, setData] = useState([]);
  const [user, setUser ] = useState(false);

  // Function to fetch user data and profiles
  const userdata = () => {
    axios.get(`${process.env.REACT_APP_APILINKS}/olddata`, { withCredentials: true })
      .then((res) => {
        if (res.status === 205) {
          setUser (false); // User is a learner
        }
        if (res.status === 200) {
          setUser (true); // User is not a learner
        }
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  };

  const cardsdata = () => {
    if (!user) {
      // Fetch data only if user is not a learner
      axios
        .get(`${process.env.REACT_APP_APILINKS}/profiles`, { withCredentials: true })
        .then((res) => {
          setData(res.data); // Set profiles data from the response
        })
        .catch((err) => {
          console.error('Error fetching profiles data:', err);
        });
    } else {
      // Fetch data for learners
      axios
        .get(`${process.env.REACT_APP_APILINKS}/profiles2`, { withCredentials: true })
        .then((res) => {
          setData(res.data); // Set profiles data from the response
        })
        .catch((err) => {
          console.error('Error fetching profiles data:', err);
        });
    }
  };

  useEffect(() => {
    userdata(); // Check if the user is a learner or not
  }, []); // Run only once when the component mounts

  useEffect(() => {
    cardsdata(); // Fetch cards data whenever user state changes
  }, [user]); // Fetch data based on user state

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar />
      <Container maxWidth="lg">
        {user ? (
          <>
            <Typography variant="h3" gutterBottom align="center">
              Learn <img src="logo.png" alt="Logo" style={{ width: 45, height: 'auto', marginTop: 30 }} /> Together
            </Typography>

            <Grid container spacing={4} marginTop={2} justifyContent="center">
              {/* Render profiles from /profiles2 */}
              {data.map((profile, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{profile.name || 'Unknown Name'}</Typography>
                      <Typography color="textSecondary">Mode: {profile.student_request || 'N/A'}</Typography>
                      {/* Accordion for Requests */}
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Requests</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {profile.student_request ? (
                            profile.student_request.split(', ').map((request, idx) => (
                              <Typography key={idx} variant="body2" color="textSecondary">
                                {request}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              No requests available.
                            </Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }}>
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h3" gutterBottom align="center">
              Explore Profiles
            </Typography>

            <Grid container spacing={4} marginTop={2} justifyContent="center">
              {/* Render profiles from /profiles */}
              {data.map((profile, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={profile.image || 'https://via.placeholder.com/150'}
                      alt={profile.email}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{profile.email || 'Unknown Email'}</Typography>
                      <Typography color="textSecondary">Location: {profile.location || 'N/A'}</Typography>
                      <Typography color="textSecondary">Contact: {profile.contact || 'N/A'}</Typography>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Skills</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {profile.skills ? (
                            profile.skills.split(', ').map((skill, idx) => (
                              <Typography key={idx} variant="body2" color="textSecondary">
                                {skill}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              No skills listed.
                            </Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                      <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
                        Request Session
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CommunicationPage;