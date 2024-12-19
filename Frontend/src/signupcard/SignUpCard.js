import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

export default function SignUpCard() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  });
  const navigate = useNavigate();


  const handler = (e) => {
    const { name, value } = e.target;
    setValues({...values,[name]:value});
  };

  const submit=(e)=>
    {
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_APILINKS}/signup`, values).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User added",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login')
        } else if(res.status===409) {
          Swal.fire({
            icon: "error",
            title: "user exist",
            text: "User Already Exist!",
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: "error",
            text: "something went wrong!",
          });
        }


      }).catch((err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      });
    }
  

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4">
        Sign up
      </Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            id="name"
            name="name"
            placeholder="First Name"
            required
            fullWidth
            variant="outlined"
            value={values.name}
            onChange={handler}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={values.category}
            label="Role"
            onChange={handler}
            required
          >
            <MenuItem value="Learner">Learner</MenuItem>
            <MenuItem value="Trainer">Trainer</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            fullWidth
            variant="outlined"
            value={values.email}
            onChange={handler}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
            fullWidth
            variant="outlined"
            value={values.password}
            onChange={handler}
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained" onClick={submit}>
          Sign up
        </Button>

        <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
          Already have an account?{' '}
          <Button variant="text" >
            Sign in
          </Button>
        </Typography>
      </Box>
    </Card>
  );
}
