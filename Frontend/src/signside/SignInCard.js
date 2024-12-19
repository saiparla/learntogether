import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card as MuiCard,
  TextField,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Navbar';

// Styled Card component
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {
  const [values, setValues] = useState({ email: '', password: '', role: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_APILINKS}/login`, values, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/content');
        } else if (res.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Wrong password',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.status === 202) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No User Found',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Database error: ${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please enter your email',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_APILINKS}/reset-password`, { email: resetEmail })
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reset link sent to your email',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsResetDialogOpen(false);
        setResetEmail('');
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Error: ${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            fullWidth
            variant="outlined"
            value={values.email}
            onChange={handleInput}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
            fullWidth
            variant="outlined"
            value={values.password}
            onChange={handleInput}
          />
          <Link
            component="button"
            variant="body2"
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => navigate('/forgot')}
          >
            Forgot your password?
          </Link>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>

      
    </Container>
  );
}
