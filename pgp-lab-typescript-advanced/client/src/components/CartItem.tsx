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
    <article>
      <span>Product: {product.name} </span>
      <span>Price: {product.price} </span>
      <span>Quantity: </span>
      {
        product.quantity > 1 &&
      <button onClick={(e) => decrement(e, product.id)}>-</button>
      }
      <span>{product.quantity} </span>
      <button onClick={(e) => increment(e, product.id)}>+</button>
      <button onClick={(e) => handleDelete(e, product.id)}>Remove</button>
    </article>
  )
}

export default CartItem;
