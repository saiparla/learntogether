import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color='inherit' component={Link} to="/signup">
            signup
          </Button>
          <Button color='inherit' component={Link} to="/login">
            signin
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Professional welcome message */}
      <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: '#3f51b5', 
          marginTop: 10, 
          marginBottom: 4 
        }}
      >
        Welcome to LearnTogether
      </Typography>
      
      {/* Container for side-by-side images */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 4, 
          marginTop: 4 
        }}
      >
      
        <img 
          src='hompic.png' 
          style={{ width: 800, height: 'auto' }} 
          alt="" 
        />
       
        <img 
          src='logo.png' 
          style={{ width: 200, height: 'auto',marginTop:1 }} 
          alt="logo" 
        />
      </Box>
    </Box>
  );
};

export default Home;
