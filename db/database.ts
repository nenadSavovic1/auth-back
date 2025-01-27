import pg from "pg";

const { Client } = pg;

// Database connection configuration
const client = new Client({
  user: "lenard",
  password: "password",
  host: "localhost",
  port: 5432, // Use the correct PostgreSQL port
  database: "api",
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

export const getAllUsers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error fetching user with id: ${id}`);
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body
  try {
    const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    if (result) {
      res.status(201).send(`User ${email} added`);

    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error creating user`);
  }
};

export const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body
  
  client.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

export const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}



export default client;
