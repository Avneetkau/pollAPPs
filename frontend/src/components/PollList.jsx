import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/polls');
      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
      // You can display a user-friendly message here if needed
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <h1>Polls</h1>
      <ul>
        {polls.map(poll => (
          <li key={poll._id}>
            <h3>{poll.question}</h3>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>{option.option} - {option.votes} votes</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;

