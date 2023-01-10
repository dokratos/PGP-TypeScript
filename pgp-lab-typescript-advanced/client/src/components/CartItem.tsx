import React from 'react';
import { ICartItem } from '../types';

interface ProductProps {
  product: ICartItem,
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
}

const CartItem = ({product, handleDelete}: ProductProps) => {

  return (
    <article>
      <span>Product: {product.name}</span>
      <span>Price: {product.price}</span>
      <span>Amount: {product.quantity}</span>
      <button onClick={(e) => handleDelete(e, product.id)}>Remove</button>
    </article>
  )
}

export default CartItem;
