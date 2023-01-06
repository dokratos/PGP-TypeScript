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
      <section className="puppy-list">
        <h1 className='puppy-list__title'>Check out our puppies!</h1>
        {puppies.map((puppy: Puppy, i) => 
        <div key={i} className='puppy-list__puppy'>
        <PuppyCard 
        puppy={puppy}
        handleData={handleDelete}
        />
        <button >
        <Link className='link' to={`/puppy/${puppy.id}`}>More on {puppy.name}!</Link>
        </button>
        </div>
        )}
      </section>
    );
}

export default PuppyList;