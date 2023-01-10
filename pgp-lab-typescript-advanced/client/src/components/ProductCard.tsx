import React from 'react';
import { Link } from 'react-router-dom'
import { IProduct } from '../types';
import AddButton from './AddButton';

interface ProductProps {
    product: IProduct
}

const ProductCard = ({product}: ProductProps) => {
  return (
    <article>
      <h1>{product.name}</h1>
      <img src={product.image}/>
      <p>{product.price}$</p>
    <Link to={`product/${product.id}`}>See Details</Link>
    <AddButton 
    product={product}
    />
    </article>
  )
}

export default ProductCard