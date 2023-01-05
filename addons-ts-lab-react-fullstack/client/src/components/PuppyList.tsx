import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PuppyCard from './PuppyCard';
import { Puppy } from '../../../types'
import axios from 'axios';

const PuppyList = () => {
    const [puppies, setPuppies] = useState<Puppy[]>([]);

    useEffect(() => {
      const getPuppies = async () => {
        const puppiesList = await axios.get('/api/puppies');
        setPuppies(puppiesList.data.db);
      };
      getPuppies();
    }, [puppies]);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.preventDefault();

      try {
        const response = await axios.delete(`/api/puppies/${id}`, {data: id});
        setPuppies(response.data);

      } catch (err) {
        console.error(err);
      }
    };
    
    return (
      <div className="App">
        {puppies.map((puppy: Puppy, i) => 
        <div key={i}>
        <PuppyCard 
        puppy={puppy}
        handleData={handleDelete}
        />
        <Link to={`/puppy/${puppy.id}`}>learn more</Link>
        </div>
        )}
      </div>
    );
}

export default PuppyList;