Polling App
A simple polling application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create polls, vote on them, and view results in real-time.

Features
Create Polls: Users can create polls by submitting a question and multiple options.
Vote on Polls: Users can vote on available polls.
Real-time Poll Results: Poll results are updated in real-time every 5 seconds.
API Endpoints: Backend RESTful API to interact with polls data.
Frontend: A simple UI built using React that interacts with the backend API.
Technologies Used
Frontend: React, Axios
Backend: Node.js, Express
Database: MongoDB
Styling: CSS, Bootstrap (or any other styling framework)
Deployment: You can deploy the app on platforms like Heroku, Netlify, or Vercel.
Project Structure
bash
Copy
polling-app/
├── backend/                    # Backend folder
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── index.js                # Express server setup
│   └── .env                    # Environment variables (e.g., MongoDB URI)
└── frontend/                   # Frontend folder
    ├── src/
    │   ├── components/         # React components (PollForm, PollList)
    │   ├── App.js              # Main app component
    │   ├── index.js            # React entry point
    └── public/
Setup Instructions
Backend Setup
Clone the repository:

bash
Copy
git clone https://github.com/yourusername/polling-app.git
cd polling-app/backend
Install dependencies:

bash
Copy
npm install
Create a .env file in the backend directory and add your MongoDB URI:

env
Copy
MONGODB_URI=your-mongo-db-uri
PORT=5000
Run the backend server:

bash
Copy
npm start
The backend should now be running on http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy
cd ../frontend
Install dependencies:

bash
Copy
npm install
Start the React development server:

bash
Copy
npm start
The frontend should now be running on http://localhost:3000.

API Endpoints
POST /polls
Description: Create a new poll with a question and options.

Request Body:

json
Copy
{
  "question": "What is your favorite color?",
  "options": [
    { "option": "Red", "votes": 0 },
    { "option": "Blue", "votes": 0 },
    { "option": "Green", "votes": 0 }
  ]
}
Response:

json
Copy
{
  "_id": "60c72b2f9e4e5c28d4a0d342",
  "question": "What is your favorite color?",
  "options": [
    { "option": "Red", "votes": 0 },
    { "option": "Blue", "votes": 0 },
    { "option": "Green", "votes": 0 }
  ],
  "__v": 0
}
GET /polls
Description: Get a list of all polls.

Response:

json
Copy
[
  {
    "_id": "60c72b2f9e4e5c28d4a0d342",
    "question": "What is your favorite color?",
    "options": [
      { "option": "Red", "votes": 0 },
      { "option": "Blue", "votes": 0 },
      { "option": "Green", "votes": 0 }
    ],
    "__v": 0
  },
  ...
]
POST /polls/:id/vote
Description: Vote for a poll option.

Request Body:

json
Copy
{
  "optionIndex": 1
}
Response:

json
Copy
{
  "_id": "60c72b2f9e4e5c28d4a0d342",
  "question": "What is your favorite color?",
  "options": [
    { "option": "Red", "votes": 0 },
    { "option": "Blue", "votes": 1 },
    { "option": "Green", "votes": 0 }
  ],
  "__v": 0
}
GET /polls/:id/results
Description: Get the results of a specific poll.

Response:

json
Copy
{
  "_id": "60c72b2f9e4e5c28d4a0d342",
  "question": "What is your favorite color?",
  "options": [
    { "option": "Red", "votes": 0 },
    { "option": "Blue", "votes": 1 },
    { "option": "Green", "votes": 0 }
  ],
  "__v": 0
}
Database Schema
Poll Schema
javascript
Copy
const pollSchema = new mongoose.Schema({
  question: String,
  options: [{ option: String, votes: { type: Number, default: 0 } }]
});
question: The poll question.
options: An array of options where each option contains:
option: The text of the option.
votes: The number of votes for that option (initialized to 0).
Troubleshooting
CORS Issues: If you’re running the frontend and backend on different ports (e.g., React on 3000 and Express on 5000), ensure that CORS is properly configured in the backend.

Example of CORS configuration in backend/index.js:

js
Copy
const cors = require('cors');
app.use(cors());  // Allow all origins by default
Database Connection Errors: Double-check your MongoDB URI in the .env file. Make sure MongoDB is running and accessible.

API Errors: If you see 500 Internal Server Error, check the backend logs for more details on what went wrong.
