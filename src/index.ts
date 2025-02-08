import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.js";
import "reflect-metadata";
import bodyParser from "body-parser";
import { UserController } from "./controllers/UserController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const userController = new UserController();

AppDataSource.initialize()
  .then(() => {
    console.log("TYPE ORM RUNNING");
  })
  .catch((error) => console.log(error));

app.get("/", (req: any, res: any) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", async (req: any, res: any) => {
  userController.getAllUsers(req, res);
});

app.post("/create", async (req, res) => {
  userController.createUser(req, res);
});

app.get("/users/:id", async (req, res) => {
  userController.getUserById(req, res);
});

app.put("/edit/:id", async (req, res) => {
  userController.updateUser(req, res);
});

app.delete("/delete/:id", async (req, res) => {
  userController.deleteUser(req, res);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
