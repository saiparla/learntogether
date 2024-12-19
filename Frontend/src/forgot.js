import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
  const navigate=useNavigate();
  const [submit, setSubmit] = useState(false);
  const [verifybutton, setVerifybutton] = useState(false);
  const [forgot, setForgot] = useState({ email: '', otp: '', newpassword: "", confirmpassword: "" });
  const [error, setError] = useState('');
  const [resendbutton,setResendbutton]=useState(false);

  const OTP = () => {
    axios.post(`${process.env.REACT_APP_APILINKS}/sendotp`, forgot, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Success", "OTP email sent successfully", "success");
          setVerifybutton(true);
        } else {
          Swal.fire("Error", "No user found with the email", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "An error occurred while sending the OTP email. Please try again.", "error");
      });
  };

  const verify = () => {
    axios.post(`${process.env.REACT_APP_APILINKS}/verifyotp`, { email: forgot.email, otp: forgot.otp })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Success", "OTP verified successfully", "success");
          setSubmit(true);
          setVerifybutton(false);
        } else if(res.status===300) {
          Swal.fire("Error", "Invalid OTP. Please try again.", "error");
          setSubmit(false);
          setVerifybutton(false);
          setResendbutton(true)
        }
      })
      .catch(() => {
        Swal.fire("Error", "OTP verification failed. Please check your OTP and try again.", "error");
      });
  };

  const handler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForgot({ ...forgot, [name]: value });
  };

  const submitbutton = () => {
    if (forgot.newpassword === forgot.confirmpassword) {
      setError('Password matched');
      passwordupdate();
    } else {
      setError('Passwords do not match. Please enter correctly.');
    }
  };

  const passwordupdate = () => {
    axios.post(`${process.env.REACT_APP_APILINKS}/forgot`, forgot)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login')
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Network error. Please try again later.", "error");
      });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 10,
          width: "600px"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Forgot Password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText="Enter your email address"
            onChange={handler}
            disabled={submit}
          />
          {!submit && (
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="otp"
      label="OTP"
      name="otp"
      autoComplete="otp"
      helperText="Enter your OTP"
      onChange={handler}
    />
    
    {!verifybutton ? (
      <Button
        variant="contained"
        sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#8fce00', color: "black", fontWeight: 600, fontFamily: "script" }}
        onClick={OTP}
      >
        Send OTP
      </Button>
    ) : (
      !resendbutton ? (
        <Button
          variant="contained"
          sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#FDEF83', color: "black", fontWeight: 600, fontFamily: "script" }}
          onClick={verify}
        >
          Verify
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#FDEF83', color: "black", fontWeight: 600, fontFamily: "script" }}
          onClick={OTP} // Trigger resend OTP when this button is clicked
        >
          Resend OTP
        </Button>
      )
    )}
  </Box>
)}
          {submit && (
            <>
              <TextField label="Create Password" name="newpassword"
                margin="normal"
                required
                fullWidth
                type='password'
                onChange={handler}
              />
              <TextField label="Confirm Password" name="confirmpassword"
                margin="normal"
                required
                fullWidth
                type='password'
                onChange={handler}
                helperText={error}
                error={!!error && error !== 'Password matched'}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                fullWidth
                onClick={submitbutton}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
