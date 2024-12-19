import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import NavBar from './signside/Navbar';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
    skill: '',
    experience:"",
    shift:""
  });
  const [olddata, setOlddata] = useState({
    email: '',
    name: '',
    skills: [],
  });
  const [user, setUser] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Fetch skills from the backend
  const skills = () => {
    axios
      .get(`${process.env.REACT_APP_APILINKS}/skills`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // If skills are returned, update the local state with fetched skills
          setOlddata((prev) => ({
            ...prev,
            skills: res.data,  // Set skills to the fetched data
          }));
        } else if (res.status === 404) {
          // Handle case where no skills are found for the user
          setOlddata((prev) => ({
            ...prev,
            skills: [],  // Empty the skills list if no skills found
          }));
          console.log(res.data.message);  // Show alert message from the API
        }
      })
      .catch((err) => {
        // Handle any error during the API call
        alert('Error fetching skills: ' + err.response?.data?.error || err.message);
      });
  };

  // Fetch user data and skills
  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_APILINKS}/olddata`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setOlddata({
            email: res.data.email,
            name: res.data.name,
            skills: res.data.skills || [], // Ensure we get the skills if available
          });
          setData({
            email: res.data.email,
            name: res.data.name,
          });
          setUser(true);
          skills();
        }
        else if(res.status===205)
        {
          setUser(false);
          studentdata()
          studentapi()
        }
      })
      .catch((err) => {
        console.log('Error fetching data: ' + err.message);
      });
  };

  // Function to handle adding a new skill to the local skills list
  const addSkillToList = () => {
    const { skill, experience, shift } = data;

    if (!skill || !experience || !shift) {
      alert('Please fill all skill details');
      return;
    }

    const newSkill = {
      skill,
      experience,
      shift,
    };

    // Add new skill to the local skills list
    setOlddata((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));

    // Clear the input fields after adding the skill
    setData({
      ...data,
      skill: '',
      experience: '',
      shift: '',
    });
  };

  // Function to handle sharing the skills to the backend
  const shareSkills = () => {
    const { email, contact, location } = data;
    const skills = olddata.skills;

    if (!email || !contact || !location || !skills.length) {
      alert('All fields are required');
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_APILINKS}/sharedskills`,
        { email, contact, location, skills },
        { withCredentials: true }
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert('Error sharing skills: ' + error.message);
      });
  };

  // Fetch user data and skills on component mount
  useEffect(() => {
    getdata();
  }, []);

  const [student,setStudent]=useState({email:"",name:"",mode:"",topic:"",duration:""})
  const studentdata=()=>
  {
    axios.get(`${process.env.REACT_APP_APILINKS}/old`,{withCredentials:true}).then((res)=>
  {
    if(res.status===200)
    {
      setStudent({
        email:res.data.email,
        name:res.data.name
      })
    }
  }).catch((err)=>
  {
    alert("err"+err);
  })
  }
  const handler=(e)=>
  {
    const{name,value}=e.target;
    setStudent({...student,[name]:value});
  }
const submitstudent = (e) => {
  e.preventDefault();
  console.log(student);
  const { mode, topic, duration } = student;

  // Ensure all fields are filled
  if (!mode || !topic || !duration) {
    alert('Please fill in all fields');
    return;
  }

  // Add preferences to the skills section
  const newPreference = {
    mode,
    topic,
    duration,
  };

  // Update the student state with the new preference
  setStudent((prevStudent) => ({
    ...prevStudent,
    skills: prevStudent.skills ? [...prevStudent.skills, newPreference] : [newPreference], // Ensure skills is an array
    mode: '', 
    topic: '', 
    duration: '', 
  }));
  senddata();
};

const senddata = () => {
  const { email, name, mode, topic, duration } = student; // Use the student state here
  if (!email || !name || !mode || !topic || !duration) {
    alert('All fields are required');
    return;
  }

  axios
    .post(
      `${process.env.REACT_APP_APILINKS}/studentdata`,
      { email, name, mode, topic, duration }, 
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        alert("Data inserted successfully.");
      }
    })
    .catch((error) => {
      alert('Error sharing student data: ' + error.message);
    });
};

const studentapi=()=>
{
  axios
      .get(`${process.env.REACT_APP_APILINKS}/studentrequest`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // If skills are returned, update the local state with fetched skills
          setStudent((prev) => ({
            ...prev,
            skills: res.data,  // Set skills to the fetched data
          }));
        } else if (res.status === 404) {
          // Handle case where no skills are found for the user
          setStudent((prev) => ({
            ...prev,
            skills: [],  // Empty the skills list if no skills found
          }));
          console.log(res.data.message);  // Show alert message from the API
        }
      })
      .catch((err) => {
        // Handle any error during the API call
        alert('Error fetching skills: ' + err.response?.data?.error || err.message);
      });
}


  return (
    <Box sx={{ width: '100%' }}>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 3, flexWrap: 'wrap' }}>
          {/* User Details */}
            {user ? (
              <>
          <Box sx={{ width: { xs: '100%', sm: '40%' }, marginBottom: 2 }}>
            <Card sx={{ marginTop: 2 }}>
              <CardContent>
                <Typography variant="h6">User Details</Typography>
                <Typography>Name: {olddata.name}</Typography>
                <Typography>Email: {olddata.email}</Typography>
                <Typography>Skills:</Typography>
                <ul>
                  {olddata.skills.length > 0 ? (
                    olddata.skills.map((skill, index) => (
                      <li key={index}>
                        {skill.skill} - {skill.experience} years - {skill.shift}
                      </li>
                    ))
                  ) : (
                    <Typography>No skills added yet.</Typography>
                  )}
                </ul>
              </CardContent>
            </Card>
          </Box>

          {/* Add Skills / Preferences */}
          <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
          
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Add Skills</Typography>
                  <TextField
                    label="Contact"
                    name="contact"
                    value={data.contact}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={data.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Skill"
                    name="skill"
                    value={data.skill}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Experience"
                    name="experience"
                    value={data.experience}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="shift">Day or Night</InputLabel>
                    <Select
                      label="shift"
                      name="shift"
                      value={data.shift}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Day">Day</MenuItem>
                      <MenuItem value="Night">Night</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2 }}
                    onClick={addSkillToList}
                  >
                    Add Skill
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={shareSkills}
                  >
                    Share Skills
                  </Button>
                </Box>
                  </Box>
              </>
            ) : (
              <>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
  <Box sx={{ width: { xs: '100%', sm: '40%' }, marginBottom: 2 }}>
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">User Details</Typography>
        <Typography>Name: {student.name}</Typography>
        <Typography>Email: {student.email}</Typography>
        <Typography>Skills:</Typography>
        <ul>
          {student.skills && student.skills.length > 0 ? (
            student.skills.map((data, index) => (
              <li key={index}>
                {data.mode} - {data.topic} - {data.duration}
              </li>
            ))
          ) : (
            <Typography>No skills added yet.</Typography>
          )}
        </ul>
      </CardContent>
    </Card>
  </Box>
  <Box sx={{ marginTop: 2, ml: 10 }}>
    <Typography variant="h6">Learning Preferences</Typography>
    <TextField
      label="Mode"
      name="mode"
      fullWidth
      margin="normal"
      value={student.mode}
      onChange={handler}
    />
    <TextField
      label="Topic"
      name="topic"
      fullWidth
      margin="normal"
      value={student.topic}
      onChange={handler}
    />
    <TextField
      label="Duration"
      name="duration"
      fullWidth
      margin="normal"
      value={student.duration}
      onChange={handler}
    />
    <Button variant="contained" color="primary" onClick={submitstudent}>
      Save Preferences
    </Button>
  </Box>
</Box>

           </> )}
        
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
