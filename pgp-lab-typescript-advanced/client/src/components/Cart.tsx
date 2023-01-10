import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICartItem } from '../types';
import CartItem from './CartItem';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const { id } = useParams()

  useEffect(() => {
      const getCart = async () => {
        const products = await axios.get(`/cart/${id}`);
        setCart(products.data);
        console.log(cart)
      };
      getCart();
    }, [cart]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: number) => {
    e.preventDefault();

    try {
      await axios.delete('/cart', {data: {itemId}});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {cart.map((cartItem: ICartItem, i) => 
      <CartItem 
      product={cartItem}
      key={i}
      handleDelete={handleDelete}
      />
      )}
    </div>
  )
}

export default Cart;
