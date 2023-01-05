import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PuppyInfo from './components/PuppyInfo';
import Landing from './components/Landing';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/puppy/:id' element={<PuppyInfo />} />
      </Routes>
  </Router>
  )
}

export default App;
