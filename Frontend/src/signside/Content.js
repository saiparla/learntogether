// Content.js
import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import NavBar from './Navbar';
import Footer from '../footer';
import { useNavigate } from 'react-router-dom';

export default function Content({ onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userId');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Box sx={{ width: "100vw" }}>
      <NavBar />
      <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}>
      <Box
  sx={{
    marginLeft: 5,
    marginTop:5,
    padding: 3,
    backgroundColor: 'rgba(240, 240, 240, 0.9)', // Light gray background
    borderRadius: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
  }}
>
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      fontFamily: 'serif', // Classic font
      textAlign: 'center',
      color: '#3F51B5', // Classic deep blue color
    }}
  >
    LearnTogether
  </Typography>
  <Typography
    variant="body1"
    sx={{
      marginTop: 2,
      fontFamily: 'Georgia, serif', // Classic serif font for text
      lineHeight: 1.8,
      color: '#333', // Darker text for readability
    }}
  >
    LearnTogether is a platform designed to foster collaborative learning by bringing together individuals or groups who share common learning goals.
  </Typography>
  <Typography
    variant="body1"
    sx={{
      marginTop: 2,
      fontFamily: 'Georgia, serif',
      lineHeight: 1.8,
      color: '#333',
    }}
  >
    By leveraging the power of teamwork, LearnTogether enhances knowledge sharing, group discussions, and collective problem-solving to accelerate learning outcomes.
  </Typography>
</Box>

        {isLoggedIn && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Typography variant="body2" onClick={onLogout} sx={{ cursor: 'pointer', color: 'blue' }}>
              Log out
            </Typography>
          </Box>
        )}
      </Stack>
      <Footer />
    </Box>
  );
}
