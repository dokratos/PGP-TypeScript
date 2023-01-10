import express from 'express';
import { Application, Request, Response } from 'express';
import { nextId } from './utils';
import getPhoto from './unsplash';
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
  
app.get('/api/puppies/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const puppy = db.find(item => item.id === Number(id));
        if (!puppy) {
            return res.status(404).send('Puppy not found!');
        }
        const index = db.findIndex(item => item.id === Number(id));
        const query = puppy.breed.split(' ').join('+').toLowerCase()
        const img = await getPhoto(`${query}`)
        const newPuppy = {...puppy, img: img}
        db.splice(index, 1, newPuppy);
        return res.status(200).send(newPuppy);
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
            birthDate,
            img: ''
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
        const index = db.findIndex(item => item.id === Number(id));
        if (!index) {
            return res.status(404).send('Puppy not found!');
        }

        const { name, breed, birthDate, img } = req.body;
        if (!name || !breed || !birthDate) {
            return res.status(418).send('Missing data');
        }
    
        const puppy = {
          id: Number(id),
          name,
          breed,
          birthDate,
          img,
        }
        db.splice(index, 1, puppy);
        return res.status(200).send(db);
        
    } catch (error) {
        return res.status(500).json({ error: error});
    }
  });
  
app.delete('/api/puppies/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const puppy = db.find(item => item.id === Number(id));
        if (!puppy) {
            return res.status(404).send('Puppy not found!');
        }
        const index = db.findIndex(item => item.id === Number(id));
        db.splice(index, 1);
        return res.status(200).send(db);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
});

export default app;
