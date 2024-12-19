import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


function Footer() {
  return (
    <Box sx={{ marginTop:'170px',bgcolor:  '#e0f7fa' , py: 6 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Logo and Description */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src='logo.png' // Ensure logo.png is in the public folder
              alt="Logo"
              sx={{ width: 28, height: 28, mr: 1 }}
            />
            <Typography variant="h6" color="text.primary">
              LearnTogether
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Share the Skill And Double Your Skill
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            © 2024 LearnTogether | Terms | Privacy
          </Typography>
        </Grid>
  
        {/* Product Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            PRODUCT
          </Typography>
          <Link href="#" variant="body2" color="text.secondary" underline="hover" display="block">
            Pricing
          </Link>
          <Link href="#" variant="body2" color="text.secondary" underline="hover" display="block">
            FAQ
          </Link>
        </Grid>
  
        {/* Company Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            LEARNTOGETHER
          </Typography>
          <Link href="/About" variant="body2" color="text.secondary" underline="hover" display="block">
            About
          </Link>
          <Link href="/contact" variant="body2" color="text.secondary" underline="hover" display="block">
            Contact
          </Link>
          
        </Grid>
  
        {/* Social Links */}
        <Grid item xs={12} md={2}>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            SOCIAL
          </Typography>
          <Box>
            <Link href="https://x.com/GMRIT1997" color="inherit" sx={{ mr: 1 }}>
              <TwitterIcon />
            </Link>
            <Link href="https://www.facebook.com/GMRITofficial" color="inherit" sx={{ mr: 1 }}>
              <FacebookIcon />
            </Link>
            <Link href="https://www.instagram.com/gmrit_rajam/?hl=en" color="inherit">
              <InstagramIcon />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
  
  );
}

export default Footer;
