import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Puppy } from '../../../types'
import axios from 'axios';

const PuppyInfo = () => {
    const [puppy, setPuppy] = useState<Puppy>({} as Puppy);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { id } = useParams()

    useEffect(() => {
        const getPuppy = async () => {
          const onePuppy = await axios.get(`/api/puppies/${id}`);
          setPuppy(onePuppy.data);
        };
        getPuppy();
      }, []);

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        setIsEdit(true);   
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPuppy({
            ...puppy,
          [e.target.name]: e.target.value,
        })
      }
    
    const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();

        try {
            await axios.put(`/api/puppies/${id}`, puppy);
            setIsEdit(false);
          } catch (err) {
            console.error(err);
          }
    }

  return (
     <section>  
         <Link className='link' to='/'>Home</Link>
      { !isEdit ?
        <article className='puppy-data'>
            <img src={puppy.img} />
            <div>
                <h1>{puppy.name}</h1>
                <p>{puppy.breed}</p>
                <p>{puppy.birthDate}</p>
                <button onClick={(e) => handleEdit(e, puppy.id)}>Edit</button>
            </div>
        </article>
      : 
        <form className='editForm'>
            <input type="text" name="name" placeholder={puppy.name} onChange={handleChange}></input>
            <input type="text" name="breed" placeholder={puppy.breed} onChange={handleChange}></input>
            <input type="number" name="birthDate" onChange={handleChange}></input>
            <button onClick={(e) => handleConfirm(e, puppy.id)}>Save</button>
        </form>
    }
   </section>
  )
}

export default PuppyInfo