import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {IProduct} from '../types';

import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const getProducts = async () => {
          const productsList = await axios.get('/products');
          setProducts(productsList.data);
        };
        getProducts();
      }, [products]);

  return (
    <div>
        {products.map((product: IProduct, i) =>
        <ProductCard
        product={product}
        key={i}
        />)}
    </div>
  )
}

export default ProductList