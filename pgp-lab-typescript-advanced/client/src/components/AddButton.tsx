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
  }
  
  const increment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCount(count + 1);
  }

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await axios.post('/cart', {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      quantity: count,
      cartId: 1
    });
    setCount(0);
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={addToCart}>add to cart</button>
    </div>
  )
}

export default AddButton;