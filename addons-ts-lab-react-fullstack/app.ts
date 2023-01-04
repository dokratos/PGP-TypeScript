import express from 'express';
import { Application, Request, Response } from 'express';
import { nextId } from './utils';
import { db } from './db';

const app: Application = express();
app.use(express.json());

app.get('/api/puppies', (_req: Request, res: Response) => {
    try {
        return res.status(200).json({ db: db })
    } catch (error) {
        return res.status(500).json({ error: error})
    }
});
  
app.get('/api/puppies/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const puppy = db.find(item => item.id === Number(id));
        if (!puppy) {
            return res.status(404).send('Puppy not found!');
        }
        return res.status(200).send(puppy);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

app.post('/api/puppies', (req: Request, res: Response) => {
    try {
        const { name, breed, birthDate } = req.body;
        if (!name || !breed || !birthDate) {
            return res.status(418).send('Missing data');
        }
        
        const newPuppy = {
            id: nextId(db),
            name,
            breed,
            birthDate
        }
        db.push(newPuppy);
        
        return res.status(201).send(db);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

app.put('/api/puppies/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let puppy = db.find(item => item.id === Number(id));
        if (!puppy) {
            return res.status(404).send('Puppy not found!');
        }

        const { name, breed, birthDate } = req.body;
        if (!name || !breed || !birthDate) {
            return res.status(418).send('Missing data');
        }
    
        puppy = {
          id: Number(id),
          name,
          breed,
          birthDate
        }
    
        return res.status(200).send(puppy);
        
    } catch (error) {
        return res.status(500).json({ error: error});
    }
  });
  
app.delete('/api/puppies/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newDb = db.filter(item => item.id !== Number(id));
        if (newDb === db) {
            return res.status(404).send('Puppy not found!');
        }
        return res.status(200).send(newDb);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

export default app;
