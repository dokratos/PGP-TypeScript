import request from 'supertest';
import app from './app';
import { db } from './db';
import { Puppy } from './types';
import { nextId } from './utils';

describe('Testing api endpoint', () => {
  test('sanity check for /test', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      test: 'is working as it should',
    });
  });
});

describe('Get request to puppies', () => {
  test('returns all puppies for /puppies', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      db: db
    });
  });
  test('returns first puppy for /puppies/1', async () => {
    const res = await request(app).get('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
        id: 1,
        breed: 'Bulldog',
        name: 'Joe',
        birthDate: 2022
    });
  });
});

const puppy: Puppy = {
  id: nextId(db),
  breed: 'Labrador',
  name: 'Tina',
  birthDate: 2022 };

  describe('Post request', () => {
  test('create new puppy', async () => {
    
      const res = await request(app)
        .post('/api/puppies')
        .send(puppy);

    expect(res.statusCode).toEqual(201);
    expect(db.length).toBe(5);
  });
});

describe.only('Put request', () => {
  test('modifies the right puppy', async () => {
    const res = await request(app).put('/api/puppies/3')
    .send({
      breed: 'bau',
      name: 'Lena',
      birthDate: 2010});
    expect(res.statusCode).toEqual(200);
    expect(db[2]).toBe({
      id: 3,
      breed: 'bau',
      name: 'Lena',
      birthDate: 2010})
  })
})

describe('Delete request', ()=> {
  test('remove puppy', async () => {
    const res = await request(app).delete('/api/puppies/2');
    expect(res.statusCode).toEqual(200);
    expect(db).not.toContain({
      id: 2,
      breed: 'Beagle',
      name: 'Romero',
      birthDate: 2020
    })
  })
})