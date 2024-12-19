const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { connect } = require('http2');
app.use(cookieparser());

const port = 7000;
const server = require('http').createServer(app);

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
const jwtkey =process.env.JWTSECRETKEY;
connection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.error("not connected:", err);
    }
});

app.post('/signup', (req, res) => {
    connection.query('SELECT * FROM registeredusers WHERE email = "' + req.body.email + '"', (err, row) => {
        if (!err) {
            if (row.length > 0) {
                res.status(409).send('Email already exists');
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hashedPassword => {
                          connection.query('INSERT INTO `registeredusers`( `name`, `email`, `password`, `category`) VALUES ("' + req.body.name + '", "' + req.body.email + '", "' + hashedPassword + '", "' + req.body.category + '")'
                            , (err, row) => {
                            if (!err) {
                                res.status(200).send('User added successfully');
                            } else {
                                res.status(400).send('Error adding user');
                                console.log('Add user error:', err);
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).send('Server error');
                        console.log('Bcrypt error:', err);
                    });
            }
        } else {
            res.status(500).send('Server error');
            console.log('Database error:', err);
        }
    });
});
app.post('/login', (req, res) => {
    connection.query(`SELECT * FROM registeredusers  WHERE email = "${req.body.email}"`, (err, results) => {
        if (!err) {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then((match) => {
                        if (match) {
                            //jwt token  creation
                            const token = jwt.sign(
                                { username: results[0].name,email: req.body.email, activitystatus: true,category:results[0].category },
                                jwtkey,
                                { expiresIn: "1h" }
                            );
                            //sent to cookies
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false,
                                sameSite: 'Strict',
                                maxAge: 60 * 60 * 1000
                            });
                            res.status(200).send("login successful");
                        } else {
                            res.status(201).send('Wrong password');
                        }
                    })
                    .catch(error => {
                        res.status(500).send('Server error');
                        console.error(error);
                    });
            } else {
                res.status(202).send("email not found");
            }
        } else {
            res.status(500).send('Server error');
            console.log('Login error:', err);
        }
    });
});
app.post('/sharedskills', (req, res) => {
    const { email, contact, location, skills } = req.body;
  
    // Check if all required fields are present
    if (!email || !contact || !location || !skills.length) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Format the skills data to insert into the database
    const skillData = skills.map((skill) => [
      email,
      contact,
      location,
      skill.skill,
      skill.experience,
      skill.shift,
    ]);
  
    // Check if the user already has skills in the database
    connection.query('SELECT * FROM skills WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error checking existing skills:', err.message);
            return res.status(500).json({ error: 'Error checking existing skills.' });
        }
        else
        if (result.length > 0) {
            connection.query('DELETE FROM skills WHERE email = ?', [email], (err, result) => {
                if (err) {
                    console.error('Error deleting old skills:', err.message);
                    return res.status(500).json({ error: 'Error deleting old skills.' });
                }
                else{
                connection.query('INSERT INTO skills (email, contact, location, skill, experience, shift) VALUES ?', 
                    [skillData], 
                    (err, result) => {
                        if (err) {
                            console.error('Error saving skills:', err.message);
                            return res.status(500).json({ error: 'Database error while saving skills.' });
                        }

                        res.status(200).json({ message: 'Skills shared successfully!' });
                    }
                );
            }
            });
        } else {
            connection.query('INSERT INTO skills (email, contact, location, skill, experience, shift) VALUES ?',
                [skillData],
                (err, result) => {
                    if (err) {
                        console.error('Error saving skills:', err.message);
                        return res.status(500).json({ error: 'Database error while saving skills.' });
                    }

                    res.status(200).json({ message: 'Skills shared successfully!' });
                }
            );
        }
    });
});



app.post('/studentdata', (req, res) => {
    const { email, name, mode, topic, duration } = req.body;

    // Check if all required fields are present
    if (!email || !name || !mode || !topic || !duration) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the user already has student data in the database
    connection.query('SELECT * FROM studentdata WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error checking existing data:', err.message);
            return res.status(500).json({ error: 'Error checking existing student data.' });
        }

        if (result.length > 0) {
            // If data exists, delete old entry and insert new data
            connection.query('DELETE FROM studentdata WHERE email = ?', [email], (err) => {
                if (err) {
                    console.error('Error deleting old data:', err.message);
                    return res.status(500).json({ error: 'Error deleting old student data.' });
                }

                // Insert new student data
                const query = 'INSERT INTO studentdata (email, name, mode, topic, duration) VALUES (?, ?, ?, ?, ?)';
                connection.query(query, [email, name, mode, topic, duration], (err) => {
                    if (err) {
                        console.error('Error saving student data:', err.message);
                        return res.status(500).json({ error: 'Database error while saving student data.' });
                    }
                    res.status(200).json({ message: 'Student data updated successfully!' });
                });
            });
        } else {
            // If no existing data, insert new student data
            const query = 'INSERT INTO studentdata (email, name, mode, topic, duration) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [email, name, mode, topic, duration], (err) => {
                if (err) {
                    console.error('Error saving student data:', err.message);
                    return res.status(500).json({ error: 'Database error while saving student data.' });
                }
                res.status(200).json({ message: 'Student data saved successfully!' });
            });
        }
    });
});



const  authenticationtoken=(req,res,next)=>
    {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).send('access denied');
        }
        else
        {
            jwt.verify(token,jwtkey,(err,decoded)=>
            {
                if(err)
                {
                    return res.status(403).send('invalid token')
                }
                else
                {
                    req.userdata = decoded;
                    next();
                }
            })
        }
    }

    app.get('/skills', authenticationtoken, (req, res) => {
        connection.query(`SELECT * FROM skills WHERE email="${req.userdata.email}"`, (err, results) => {
            if (!err) {
                if (results.length > 0) {
                    res.status(200).json(results);  // Send back the skills data for the user
                } else {
                    res.status(404).json({ message: 'No skills found for this user.' });
                }
            } else {
                console.error('Error fetching skills:', err);
                res.status(500).json({ error: 'Database error while fetching skills.' });
            }
        });
    });
    app.get('/studentrequest', authenticationtoken, (req, res) => {
        connection.query(`SELECT * FROM studentdata WHERE email="${req.userdata.email}"`, (err, results) => {
            if (!err) {
                if (results.length > 0) {
                    res.status(200).json(results);  // Send back the skills data for the user
                } else {
                    res.status(404).json({ message: 'No skills found for this user.' });
                }
            } else {
                console.error('Error fetching skills:', err);
                res.status(500).json({ error: 'Database error while fetching skills.' });
            }
        });
    });
    app.get('/olddata', authenticationtoken, (req, res) => {
        connection.query(`select * from registeredusers where email="${req.userdata.email}"`, (err, results) => {
            if (!err) {
                if (req.userdata.category === "Trainer") {
                    res.status(200).json(results[0]);
                }
                else 
                if (req.userdata.category === "Learner") {
                    res.status(205).json(results[0]);
                }
            } else {
                res.status(201).send('failed');
            }
        });
    });
    app.get('/userauth', authenticationtoken, (req, res) => {
        connection.query(`select * from registeredusers where email="${req.userdata.email}"`, (err, results) => {
            if (!err) {
                if (req.userdata.category === "Trainer") {
                    res.status(200).send("trainer login");
                }
            } else
            if (req.userdata.category === "Learner") {
                res.status(207).send("learner log");
            } else {
                res.status(201).send('failed');
            }
        });
    });
    app.get('/old', authenticationtoken, (req, res) => {
        connection.query(`select * from registeredusers where email="${req.userdata.email}"`, (err, results) => {
            if (!err) {
                if (req.userdata.category === "Learner") {
                    res.status(200).json(results[0]);
                } 
            } else {
                res.status(201).send('failed');
            }
        });
    });
    
        app.get('/profiles',authenticationtoken, (req, res) => {
            console.log(req.userdata.email)
            const query = `
              SELECT 
                email,
                contact,
                location,
                GROUP_CONCAT(CONCAT(skill, ' (', experience, ' - ', shift, ')') SEPARATOR ', ') AS skills
              FROM skills
              GROUP BY email, contact, location ;
            `;
          
            connection.query(query, (error, results) => {
                console.log(results)
              if (error) {
                console.error('Database error:', error);
                res.status(500).json({ error: 'Database query failed' });
              } else {
                res.status(200).json(results);
              }
            });
          });
          app.post('/logout', authenticationtoken, (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
            });
            res.status(200).send("Logged out successfully");
        });

        app.get('/profiles2',authenticationtoken, (req, res) => {
            // console.log(req.userdata.email)
            const query = `
              SELECT 
                email,
                name,
                GROUP_CONCAT(CONCAT(mode, ' (', topic, ' - ', duration, ')') SEPARATOR ', ') AS student_request
              FROM studentdata
              GROUP BY email, name;
            `;
          
            connection.query(query, (error, results) => {
                console.log(results)
              if (error) {
                console.error('Database error:', error);
                res.status(500).json({ error: 'Database query failed' });
              } else {
                res.status(200).json(results);
              }
            });
          });
         
          app.post('/send-notification', authenticationtoken, (req, res) => {
            const { senderEmail, receiverEmail, message } = req.body;
            const query = `
                INSERT INTO notifications (email, message, sender_email)
                VALUES (?, ?, ?);
            `;
            connection.query(query, [receiverEmail, message, senderEmail], (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    res.status(500).json({ error: 'Failed to send notification' });
                } else {
                    res.status(200).json({ success: true, message: 'Notification sent successfully' });
                }
            });
        });
        
        app.post('/accept-notification', authenticationtoken, (req, res) => {
            const { notificationId, senderEmail, receiverEmail } = req.body;
            const query = `
                UPDATE notifications
                SET status = 'accepted'
                WHERE id = ?;
            `;
            connection.query(query, [notificationId], (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    res.status(500).json({ error: 'Failed to accept notification' });
                } else {
                    // Notify the original sender
                    const notifySenderQuery = `
                        INSERT INTO notifications (email, message)
                        VALUES (?, 'Your connection request was accepted');
                    `;
                    connection.query(notifySenderQuery, [senderEmail], (err) => {
                        if (err) {
                            console.error('Failed to notify sender:', err);
                        }
                    });
                    res.status(200).json({ success: true, message: 'Notification accepted and sender notified' });
                }
            });
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.EMAILPASSWORD
            }
        });
        app.post('/sendotp', (req, res) => {
            const otp = crypto.randomInt(100000, 1000000);
        
            const email = req.body.email;
        
            connection.query('SELECT * FROM registeredusers WHERE email = ?', [email], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).send("Database error while checking user existence");
                }
        
                if (result.length === 0) {
                    return res.status(404).send("No registered user found with this email");
                }
        
                connection.query('SELECT * FROM otp WHERE email = ?', [email], (err, otpResult) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).send("Error checking existing OTP");
                    }
        
                    const query = otpResult.length > 0
                        ? 'UPDATE otp SET otp_code = ? WHERE email = ?'
                        : 'INSERT INTO otp (otp_code, email) VALUES (?, ?)';
                    const params = otpResult.length > 0 ? [otp, email] : [otp, email];
        
                    connection.query(query, params, (err) => {
                        if (err) {
                            console.error('Error saving OTP:', err);
                            return res.status(500).send("Failed to store OTP in the database");
                        }
        
                        const mailOptions = {
                            from: process.env.USEREMAIL,
                            to: email,
                            subject: 'Your OTP Code',
                            text: `Hello, your OTP is: ${otp}`
                        };
        
                        transporter.sendMail(mailOptions, (error) => {
                            if (error) {
                                console.error('Error sending OTP email:', error);
                                return res.status(500).send("Failed to send OTP email");
                            }
        
                            res.status(200).send("OTP sent successfully");
                        });
                    });
                });
            });
        });
        app.post('/verifyotp',(req,res)=>
            {
                console.log(req.body.otp)
                connection.query('select * from otp where email="'+req.body.email+'"',(err,result)=>
                {
                    const textfieldvalue=req.body.otp;
                    const dbvalue = result[0].otp_code.toString();
                    console.log(textfieldvalue);
                    console.log(dbvalue)
                    if(!err)
                    {
                        if(textfieldvalue===dbvalue)
                        {
                            res.status(200).send("otp verified");
                        }
                        else
                        {
                            res.status(300).send("otp verification failed")
                        }
                    }
                    else
                    {
                        res.send(401).send("otp error")
                    }
                })
            })
            app.post('/forgot', (req, res) => {
                bcrypt.hash(req.body.confirmpassword, 10)
                    .then((hashedpassword) => {
                        connection.query(`UPDATE registeredusers SET password="${hashedpassword}" WHERE email ='${req.body.email}'`, (err, result) => {
                            if (!err) {
                                res.status(200).send('data fetched');
                            } else {
                                res.status(401).send('error');
                                console.log('forgot error', err);
                            }
                        });
                    }).catch((err) => {
                        res.status(500).send('server error');
                        console.log("forgot error", err);
                    });
            });            
        
        
app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
