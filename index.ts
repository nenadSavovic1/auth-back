import express from 'express';
import bodyParser from 'body-parser';
import client from './db/database.js'; 

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req:any, res:any) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})

app.get('/users', async (req:any, res:any) => {
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    }
  });
  