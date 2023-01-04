import React, { useState } from 'react';
import axios from 'axios';
import { Puppy } from '../../../types';

const AddForm = () => {
    const [newPuppy, setNewPuppy] = useState<Puppy>({} as Puppy);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPuppy({
          ...newPuppy,
          [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('/api/puppies', newPuppy);  
        } catch (error) {
            console.error();
        }
    }
  
  return (
    <form onSubmit={e => handleSubmit(e)}>
        <input
            type='text'
            placeholder='Name'
            name='name'
            onChange={e => handleChange(e)}
        ></input>
        <input
            type='text'
            placeholder='Breed'
            name='breed'
            onChange={e => handleChange(e)}
        ></input>
        <input
            type='text'
            placeholder='Birth Year'
            name='birthDate'
            onChange={e => handleChange(e)}
        ></input>
        <input type='submit' value='Add' />
    </form>
  )
}

export default AddForm;
