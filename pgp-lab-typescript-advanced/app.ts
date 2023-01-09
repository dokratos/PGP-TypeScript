import express from 'express';
import { Application, Request, Response } from 'express';
import { pool } from './db';
import getProducts from './dummyjson';

const app: Application = express();
app.use(express.json());

app.get('/products', async (_req: Request, res: Response) => {
    try {
          const result = await pool.query('SELECT * FROM products ORDER BY id ASC')
          return res.status(200).json(result.rows)
        } catch (error) {
          return res.status(500).json({ error: error})
        }
});

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return res.status(200).json(product.rows);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

app.post('/products', async (req: Request, res: Response) => {
    const dummyProducts = await getProducts();
    const product = await pool.query('INSERT INTO products (name, description, image, price, stock, category) VALUEs ($1, $2, $3, $4, $5, $6)', [dummyProducts.title, dummyProducts.description, dummyProducts.thumbnail, dummyProducts.price, dummyProducts.stock, dummyProducts.category])

    return res.status(200).send(product)
})

app.post('/cart', async (req: Request, res: Response) => {
    try {     
        const cart = await pool.query('INSERT INTO carts (date, total_price) VALUEs ($1, $2)', [Date(), 0]);
        return res.status(201).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

app.get('/cart/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const cart = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return res.status(200).json(cart.rows);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

// app.post('/cart/:id', async (req: Request, res: Response) => {
//     const cartId = parseInt(req.params.id);
//     const { productId } = req.body;

    
// })

export default app;