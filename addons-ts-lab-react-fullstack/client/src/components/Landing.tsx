import React from 'react';
import AddForm from './AddForm';
import PuppyList from './PuppyList';

const Landing = () => {
  return (
    <main>
        <h1>Check our puppies!</h1>
        <PuppyList />
        <AddForm />
    </main>
  )
}

export default Landing;