import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  private sendResponse(
    res: Response,
    status: number,
    message: string,
    data?: any
  ) {
    return res.status(status).json({ message, ...(data && { data }) });
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      this.sendResponse(res, 200, "Users fetched successfully", users);
    } catch (err) {
      console.error(err);
      this.sendResponse(res, 500, "Error fetching users");
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, age, email, password, roleId } = req.body;

      const newUser = await this.userService.registerUser(
        first_name,
        last_name,
        age,
        email,
        password,
        UserService.getRequireRoles() ? roleId : null // Inline role assignment
      );

      this.sendResponse(res, 201, "User created successfully", newUser);
    } catch (error) {
      this.sendResponse(res, 500, error.message || "Error creating user");
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await this.userService.findUserById(id);
      if (user) {
        this.sendResponse(
          res,
          200,
          `User with id ${id} fetched successfully`,
          user
        );
      } else {
        this.sendResponse(res, 404, `No user found with id: ${id}`);
      }
    } catch (error) {
      console.error(error);
      this.sendResponse(res, 500, `Error fetching user with id: ${id}`);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { first_name, last_name, email, age, password } = req.body;
    try {
      await this.userService.updateUser(id, {
        first_name,
        last_name,
        age,
        email,
        password,
      });
      this.sendResponse(res, 200, `User with id ${id} successfully updated`);
    } catch (error) {
      console.error(error);
      this.sendResponse(res, 500, `Error updating user with id: ${id}`);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.userService.deleteUser(id);
      this.sendResponse(res, 200, `User with id ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
      this.sendResponse(res, 500, `Error deleting user with id: ${id}`);
    }
  };
}
