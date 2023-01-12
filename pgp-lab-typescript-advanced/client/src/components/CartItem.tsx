import React from 'react';
import { ICartItem } from '../types';

interface ProductProps {
  product: ICartItem,
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
  increment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
  decrement: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
}

const CartItem = ({product, handleDelete, decrement, increment}: ProductProps) => {

  return (
    <article className='flex flew-row justify-between mb-2'>
      <span
      className='w-40'
      >{product.name} </span>
      <span className='w-20'>{product.price} $</span>
      <div className='w-24'>
      { (product.quantity > 1) &&
      <button 
      className='shadow bg-grey-200 focus:shadow-outline font-bold py-1.5 px-3 rounded'
      onClick={(e) => decrement(e, product.id)}>-</button>
      }
      <span
      className='mx-2'
      >{product.quantity} </span>
      <button 
       className='shadow bg-grey-200 focus:shadow-outline font-bold py-1.5 px-3 rounded'
       onClick={(e) => increment(e, product.id)}>+</button>
       </div>
      <button 
       className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded'
      onClick={(e) => handleDelete(e, product.id)}>Remove</button>
    </article>
  )
}

export default CartItem;
