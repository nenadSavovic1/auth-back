import pg from 'pg';

const { Client } = pg;

// Database connection configuration
const client = new Client({
  user: 'lenard',
  password: 'password',
  host: 'localhost',
  port: 5432, // Use the correct PostgreSQL port
  database: 'api',
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default client;