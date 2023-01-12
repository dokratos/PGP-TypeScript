import React from 'react';
import { Link } from 'react-router-dom'
import { IProduct } from '../types';
import AddButton from './AddButton';

interface ProductProps {
    product: IProduct
}

const ProductCard = ({product}: ProductProps) => {
  return (
    <article className='flex flex-col items-center'>
      <Link to={`product/${product.id}`}>
      <img src={product.image} className='w-80 h-60 rounded-lg'/>
      </Link>
      <h1 className='font-bold'>{product.name}</h1>
      <p>{product.price}$</p>
      <AddButton product={product} />
    </article>
  )
}

export default ProductCard;
