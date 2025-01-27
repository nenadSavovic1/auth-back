import express from "express";
import "reflect-metadata"
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source"
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./db/database.js";
import { User } from "./entity/User";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

AppDataSource.initialize()
    .then(() => {
        console.log('TYPE ORM RUNNING')
    })
    .catch((error) => console.log(error))


app.get("/", (req: any, res: any) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", async (req: any, res: any) => {
  getAllUsers(req, res);
});

app.get("/users/:id", async (req, res) => {
  getUserById(req, res);
});

app.post("/create", async (req, res) => {
  const user = new User();
  user.firstName = 'Nenad';
  user.lastName = 'Savovic';
  user.age = 38;
  user.email = 'nenad_savovic@yahoo.com';

  await AppDataSource.manager.save(user)
  console.log("new user added", user.id)
  res.status(201).send('User created');
  // createUser(req, res);
});

app.put("/edit/:id", async (req, res) => {
  updateUser(req, res);
});

app.delete("/delete/:id", async (req, res) => {
  deleteUser(req, res);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

