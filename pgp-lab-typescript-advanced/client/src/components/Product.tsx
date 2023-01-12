import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../types';
import AddButton from './AddButton';
import axios from 'axios';

const Product = () => {
    const [product, setProduct] = useState<IProduct>({} as IProduct);

    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
          const oneProduct = await axios.get(`/products/${id}`);
          setProduct(oneProduct.data[0]);
        };
        getProduct();
      }, []);

  return (
    <main className='bg-slate-200'>
      <section className="flex flex-col mx-20 pt-12 lg:mx-40">
        <h1 className='font-medium text-xl'>{product.name}</h1>
        <img src={product.image} className='rounded my-4'/>
        <p>{product.description}</p>
        <p>Stock {product.stock}</p>
        <h3>{product.price}$</h3>
        <AddButton 
        product={product}
        />
      </section>
    </main>
  )
}

export default Product