import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICartItem } from '../types';
import CartItem from './CartItem';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemsAmount, setItemsAmount] = useState<number>(0);

  const { id } = useParams()

  useEffect(() => {
      const getCart = async () => {
        const products = await axios.get(`/cart/${id}`);
        setCart(products.data);
        if (cart.length > 0) {
          const price = cart.map(item => Number(item.price)*item.quantity).reduce((a, b) => a + b);
          setTotalPrice(price);
          const numberOfItems = cart.map(item => item.quantity).reduce((a, b) => a + b);
          setItemsAmount(numberOfItems);
        } else {
          setItemsAmount(0);
          setTotalPrice(0);
        }
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

  const decrement = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: number) => {
    e.preventDefault();
    try {
      await axios.patch('/cart', {itemId: itemId, quantity: -1})
    } catch (error) {
      console.error(error);
    };
  };
  
  const increment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: number) => {
    e.preventDefault();
    try {
      await axios.patch('/cart', {itemId: itemId, quantity: 1})
    } catch (error) {
      console.error(error);
    };
  }

  const checkout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await axios.delete(`/cart/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {cart.map((cartItem: ICartItem, i) => 
      <CartItem 
      product={cartItem}
      key={i}
      handleDelete={handleDelete}
      increment={increment}
      decrement={decrement}
      />
      )}
      <div>Total Price: {totalPrice}$</div>
      <div>Quantity: {itemsAmount}</div>
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}

export default Cart;
