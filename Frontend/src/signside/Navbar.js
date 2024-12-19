import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCircleInfo, faHouseUser, faUsersLine, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount or after logout
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set to true if user data exists, false otherwise
  }, []);

  // Handle logout and redirect
  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_APILINKS}/logout`, {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          alert("Logged out successfully");
          setIsLoggedIn(false);  // Update the state after logout
          localStorage.removeItem('user');  // Remove the user from localStorage
          navigate('/login');  // Redirect to login page
        }
      })
      .catch((err) => {
        alert('Logout error');
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img src='logo.png' alt="Logo" style={{ height: '50px', width: '50px', marginLeft: '24px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Add any text here if needed */}
        </Typography>
        <Button color="inherit" component={Link} to="/content">
          <FontAwesomeIcon icon={faHouseUser} style={{ marginRight: 7 }} />  Home
        </Button>
        <Button color="inherit" component={Link} to="/About">
          <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: 7 }} />  About
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: 7 }} />  Contact
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: 7 }} />  Profile
        </Button>
        <Button color="inherit" component={Link} to="/com">
          <FontAwesomeIcon icon={faUsersLine} style={{ marginRight: 7 }} />  LT HUB
        </Button>
        <Button color='inherit' component={Link} to='/notify'>
          <Badge badgeContent={1} color="success" sx={{ marginLeft: 1 }}>
            <MailIcon color="action" />
          </Badge>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 7 }} />  Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
