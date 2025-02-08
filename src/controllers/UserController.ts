import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, age, email, password } = req.body;

      const newUser = await this.userService.registerUser(
        first_name,
        last_name,
        age,
        email,
        password
      );
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const user = await this.userService.findUserById(id);
      if (user) {
        res.status(200).send(user);
      } else {
        throw new Error(`No user found with id: ${id}`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(`Error fetching user with id: ${id}`);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, age, password } = req.body;
    try {
      await this.userService.updateUser(id, {
        first_name,
        last_name,
        age,
        email,
        password,
      });
      res.status(200).send(`User with id ${id} successfully updated`);
    } catch (error) {
      res.status(500).send(`Error editing user with id: ${id}`);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      await this.userService.deleteUser(id);
      res.status(200).send(`User with id: ${id} deleted`);
    } catch (error) {
      res.status(500).send(`Error deleting user with id: ${id}`);
    }
  };
}
