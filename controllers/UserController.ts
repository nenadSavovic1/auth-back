import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  static getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
    }
  };

  static createUser = async (req, res) => {
    try {
      const { first_name, last_name, age, email, password } = req.body;

      const newUser = await userService.registerUser(
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
      return res.status(500).json({ success: false, message: error });
    }
  };

  static getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const user = await userService.findUserById(id);
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

  static updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, age, password } = req.body;
    try {
      await userService.updateUser(id, {
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

  static deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    try {
      userService.deleteUser(id);
      res.status(200).send(`User with id: ${id} deleted`);
    } catch (error) {
      res.status(500).send(`Error deleting user with id: ${id}`);
    }
  };
}
