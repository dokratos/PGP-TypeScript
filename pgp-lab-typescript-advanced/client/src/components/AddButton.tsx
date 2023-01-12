import React, {useState} from 'react';
import axios from 'axios';
import { IProduct } from '../types';

interface ProductProps {
  product: IProduct
}

const AddButton = ({product} : ProductProps) => {
  const [count, setCount] = useState<number>(0);

  const decrement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCount(count - 1);
  };
  
  const increment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCount(count + 1);
  };

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (count > 0) {
      await axios.post('/cart', {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity: count,
        cartId: 1
      });
    }
    setCount(0);
  }

  return (
    <div className='flex flex-row min-w-full items-baseline justify-between pb-4'>
      <div>
      { count > 0 &&
      <button 
      className='shadow bg-white focus:shadow-outline font-bold py-1.5 px-3 rounded'
      onClick={decrement}>-</button>
      }
      <span
      className='px-3'
      >{count}</span>
      <button 
      className='shadow bg-white focus:shadow-outline font-bold py-1.5 px-3 rounded'
      onClick={increment}>+</button>
      </div>
      <button 
      className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1.5 px-3 rounded'
      onClick={addToCart}>Add</button>
    </div>
  )
}

export default AddButton;
