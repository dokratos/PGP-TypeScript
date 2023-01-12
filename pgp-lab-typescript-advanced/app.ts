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

app.post('/products', async (_req: Request, res: Response) => {
    const dummyProducts = await getProducts();
    const product = await pool.query('INSERT INTO products (name, description, image, price, stock, category) VALUEs ($1, $2, $3, $4, $5, $6)', [dummyProducts.title, dummyProducts.description, dummyProducts.thumbnail, dummyProducts.price, dummyProducts.stock, dummyProducts.category])

    return res.status(200).send(product)
})

// app.post('/cart', async (_req: Request, res: Response) => {
//     try {     
//         const cart = await pool.query('INSERT INTO carts (date, total_price) VALUES ($1, $2)', [Date(), 0]);
//         return res.status(201).json(cart);
//     } catch (error) {
//         return res.status(500).json({ error: error});
//     }
// });

app.get('/cart/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const cart = await pool.query('SELECT * FROM cartItems WHERE cart_id = $1', [id]);
        return res.status(200).json(cart.rows);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

app.post('/cart', async (req: Request, res: Response) => {
    try {
        const { productId, productName, productPrice, quantity, cartId } = req.body;
				const order = await pool.query('INSERT INTO cartItems (product_id, cart_id, quantity, name, price) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (product_id) DO UPDATE SET quantity = cartItems.quantity + excluded.quantity returning *', [productId, cartId, quantity, productName, productPrice]);
        return res.status(201).json(order.rows);
    } catch (error) {
        return res.status(500).json({ error: error});
    };
});

app.patch('/cart', async (req: Request, res: Response) => {
	try {
		const { itemId, quantity } = req.body;
		await pool.query('UPDATE cartItems SET quantity = cartItems.quantity + $2 WHERE ID = $1 returning *', [itemId, quantity])
		return res.status(201).send('ok');
	} catch (error) {
		return res.status(500).json({ error: error});
	}
});

app.delete('/cart', async (req: Request, res: Response) => {
	try {
		const { itemId } = req.body;
		await pool.query('DELETE FROM cartItems WHERE id = $1', [itemId]);
		return res.status(200).send('ok');
	} catch (error) {
		return res.status(500).json({ error: error});
	}
});

app.delete('/cart/:id', async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
        const cartProducts = await pool.query('SELECT * FROM cartItems WHERE cart_id = $1', [id]);
        cartProducts.rows.map(async (item) => {
            await pool.query('UPDATE products SET stock = products.stock - $2 WHERE ID = $1',[item.product_id, item.quantity])
        })
		await pool.query('DELETE FROM cartItems WHERE cart_id = $1', [id]);
		return res.status(200).send('ok');
	} catch (error) {
		return res.status(500).json({ error: error});
	}
});

export default app;
