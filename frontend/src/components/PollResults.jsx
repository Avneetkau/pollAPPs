import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PollResults = ({ pollId }) => {
  const [results, setResults] = useState(null);

  const fetchResults = async () => {
    const result = await axios.get(`http://localhost:5000/polls/${pollId}/results`);
    setResults(result.data);
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [pollId]);

  if (!results) return <p>Loading...</p>;

  return (
    <div>
      <h4>Results:</h4>
      {results.options.map((option, index) => (
        <p key={index}>{option.option}: {option.votes} votes</p>
      ))}
    </div>
  );
};

export default PollResults;
