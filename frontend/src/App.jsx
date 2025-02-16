import React from 'react';
import PollForm from './components/PollForm';
import PollList from './components/PollList';
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Poll App</h1>
      <PollForm />
      <PollList />
    </div>
  );
}

export default App;
