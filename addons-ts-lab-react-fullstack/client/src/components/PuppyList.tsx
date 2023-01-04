import React, {useState, useEffect} from 'react';
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
  
    return (
      <div className="App">
        {puppies.map((puppy: Puppy, i) => 
        <PuppyCard 
        puppy={puppy}
        key={i}
        />
        )}
      </div>
    );
}

export default PuppyList;