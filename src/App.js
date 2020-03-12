import React from 'react';
import './App.css';
//import ListOfTasks from './components/ListOfTasks'
import Title from './components/Title'
import MainRouter from './components/MainRouter';

function App() {
  return (
    <div className="App">
      <Title></Title>
      <MainRouter></MainRouter>
    </div>
  );
}

export default App;
