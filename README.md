Learn Together Project

Overview
Learn Together is a project designed to foster collaborative learning among users. It provides a backend powered by Node.js and Express.js, with a MySQL database for managing and storing application data.

Features
- RESTful API for managing users, courses, and learning resources.
- Secure authentication and authorization.
- Integration with a MySQL database for persistent data storage.
- Scalable backend architecture ready for future enhancements.

Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Version Control:** Git and GitHub

Installation and Setup

Prerequisites
Ensure the following are installed on your system:
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Git

Steps
1. Clone the repository:
   git clone https://github.com/saiparla/learntogether.git
2. Navigate to the backend directory:
   cd learntogether/backend
3. Install dependencies:
   npm install
4. Set up the MySQL database:
   - Create a new database in MySQL (e.g., `learntogether_db`).
   - Run the provided SQL scripts in `backend/database/schema.sql` to set up the tables.

5. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following details:
     DB_HOST=localhost
     DB_USER=<your-mysql-username>
     DB_PASSWORD=<your-mysql-password>
     DB_NAME=learntogether_db
     PORT=5000
     JWT_SECRET=<your-secret-key>
6. Start the server:
   npm start
7. Verify the API is running by visiting `http://localhost:5000` in your browser or using a tool like Postman.
API Endpoints
Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and obtain a token.
Users
- `GET /api/users` - Retrieve a list of users.
- `GET /api/users/:id` - Retrieve details of a specific user.
Courses
- `GET /api/courses` - Retrieve all courses.
- `POST /api/courses` - Add a new course (admin-only).
- `PUT /api/courses/:id` - Update course details (admin-only).
- `DELETE /api/courses/:id` - Delete a course (admin-only).
License
This project is licensed under the MIT License. See the `LICENSE` file for details.
Contact
For any inquiries or support, contact Saikumar Parla via [GitHub](https://github.com/saiparla).

