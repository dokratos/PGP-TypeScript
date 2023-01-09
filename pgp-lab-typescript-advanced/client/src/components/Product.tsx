import React from 'react';
import { IProduct } from '../types';

interface ProductProps {
    product: IProduct
}

const Product = ({product}: ProductProps) => {
  return (
    <div>{product.name}</div>
  )
}

export default Product