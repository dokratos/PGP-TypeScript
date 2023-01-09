import axios from 'axios';

const getProducts = async () => {
    try {
        const results = await axios.get('https://dummyjson.com/products')
        return results.data.products[10];
    } catch(e) {
        console.error(e);
    }
}

export default getProducts;