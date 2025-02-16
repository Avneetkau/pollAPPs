import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";

const PollForm = ({ refreshPolls }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPoll = { question, options: options.map(option => ({ option, votes: 0 })) };
    await axios.post('http://localhost:5000/polls', newPoll);
    setQuestion('');
    setOptions(['', '']);
    refreshPolls();  // Refresh the poll list
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="form">Create Poll</h3>
      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          required
        />
      ))}
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollForm;
