import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Puppy } from '../../types';
import './App.css';
import PuppyList from './components/PuppyList';
// import NavBar from './components/NavBar';
import AddForm from './components/AddForm';


function App() {
  return (
  //   <Router>
  //     <NavBar />
  //     <Routes>
  //       <Route path='/' element={<PuppyList />} />
  //       <Route path='/newpuppy' element={<AddForm />} />
  //     </Routes>
  // </Router>
  <>
  <h1>Check our puppies!</h1>
  <PuppyList />
  <AddForm />
  </>
  )
}

export default App;
