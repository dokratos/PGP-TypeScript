import pg from "pg";
const { Pool } = pg;
import * as dotenv from 'dotenv';

dotenv.config();

const password = process.env.DB_KEY;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tsecommerce',
  password: password,
  port: 5432,
})