import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select, {SingleValue} from 'react-select'
import {IProduct} from '../types';

import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filter, setFilter] = useState<IProduct[]>([]);
    
    useEffect(() => {
      const getProducts = async () => {
        const productsList = await axios.get('/products');
        setProducts(productsList.data);
        setFilter(productsList.data);
      };
        getProducts();
      }, []);

      const selectChange = ((newValue: SingleValue<{ value: string; label: string; }>) => {
        if (newValue) {
          if (newValue.value === 'All') return setFilter(products);

          const filtered = products.filter(item => item.category === newValue.value);
          setFilter(filtered);
        }
      });

  const options = [
    { value: 'All', label: 'All'},
    { value: 'smartphones', label: 'smartphones'},
    { value: 'laptops', label: 'laptops'},
    { value: 'fragrances', label: 'fragrances'}
    ]

  return (
    <main className='bg-slate-200'>
      <Select 
      options={options} 
      onChange={selectChange}
      className='mb-10'
      />
      <section className='flex flex-row flex-wrap justify-around'>
        {filter.map((product: IProduct, i) =>
        <ProductCard
        product={product}
        key={i}
        />)}
      </section>
    </main>
  )
};

export default ProductList;
