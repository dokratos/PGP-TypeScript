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
    <main>
      <section>
        <h1>{product.name}</h1>
        <img src={product.image} />
        <h3>{product.price}$</h3>
        <p>{product.description}</p>
        <p>Stock: {product.stock}</p>
        <AddButton 
        product={product}
        />
      </section>
    </main>
  )
}

export default Product