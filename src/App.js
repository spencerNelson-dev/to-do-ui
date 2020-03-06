import React from 'react';
import './App.css';
import ListOfTasks from './components/ListOfTasks'
import Title from './components/Title'

function App() {
  return (
    <div className="App">
      <Title></Title>
      <ListOfTasks></ListOfTasks>
    </div>
  );
}

export default App;
