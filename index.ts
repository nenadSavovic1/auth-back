import express from "express";
import "reflect-metadata"
import bodyParser from "body-parser";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from "./db/database.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: any, res: any) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", async (req: any, res: any) => {
  getAllUsers(req, res);
});

app.post("/create", async (req, res) => {
  createUser(req, res);
});

app.get("/users/:id", async (req, res) => {
  getUserById(req, res);
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

