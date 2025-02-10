import validator from "validator";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";
import { Role } from "../entity/Role";
import { ENV } from "../environment";

export class UserService {
  private userRepository = AppDataSource.getRepository(Users);
  private roleRepository = AppDataSource.getRepository(Role);
  private static requireRoles: boolean = ENV.REQUIRE_ROLES;

  public static getRequireRoles(): boolean {
    return this.requireRoles;
  }

  /**
   * Registers a new user
   * @param email - User's email
   * @param password - User's password (plaintext, will be hashed)
   * @returns Newly created user (excluding password)
   */
  async registerUser(
    first_name: string,
    last_name: string,
    age: number,
    email: string,
    password: string,
    roleId: number
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email not valid");
    }

    if (!first_name || !last_name || !age || !email || !password) {
      throw new Error("All fields are required");
    }

    if (UserService.requireRoles && !roleId) {
      throw new Error("Role ID is required when role-based access is enabled");
    }

    let role = null;

    if (roleId) {
      // Use findOneBy for simplicity
      role = await this.roleRepository.findOneBy({ id: roleId });

      if (!role) {
        throw new Error(`Role with ID ${roleId} not found`);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      first_name,
      last_name,
      age,
      password: hashedPassword,
      role: UserService.getRequireRoles() ? role : null,
    });

    await this.userRepository.save(newUser);

    // Exclude password before returning
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  /**
   * Finds a user by email
   * @param email - User's email
   * @returns User entity or null
   */
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Finds a user by email
   * @param id - User's id
   * @returns User entity or null
   */
  async findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Fetches all users (admin use case)
   * @returns List of users
   */
  async getAllUsers() {
    return this.userRepository.find({
      select: ["id", "email", "first_name", "last_name", "createdAt"],
    });
  }

  /**
   * Updates user details by ID
   * @param id - User's ID
   * @param updates - Object containing fields to update
   * @returns Updated user (excluding password)
   */
  async updateUser(
    id: number,
    updates: {
      first_name?: string;
      last_name?: string;
      age?: number;
      email?: string;
      password?: string;
    }
  ) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    // Validate email if provided
    if (updates.email && !validator.isEmail(updates.email)) {
      throw new Error("Invalid email format");
    }

    // Check for existing email conflict
    if (updates.email && updates.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updates.email },
      });
      if (existingUser) {
        throw new Error("Email is already in use");
      }
    }

    // Hash password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Update user fields
    Object.assign(user, updates);

    await this.userRepository.save(user);

    // Exclude password before returning
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Deletes a user by ID
   * @param id - User's ID
   * @returns Success message or error if user is not found
   */
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.remove(user);

    return { message: "User deleted successfully" };
  }
}
