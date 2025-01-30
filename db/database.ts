import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";

AppDataSource.initialize()
  .then(() => {
    console.log('TYPE ORM RUNNING')
  })
  .catch((error) => console.log(error))

  const userRepository = AppDataSource.getRepository(Users);


export const getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new Users();
    const { first_name, last_name, age, email } = req.body;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.age = age;
    newUser.email = email;

    await AppDataSource.manager.save(newUser);
    console.log("New user has been saved. User id is", newUser.id);
    res.status(201).json({
      message: `User ${newUser.id} added`,
    });
  } catch (e) {
    console.log("Error has ben thrown: ", e);
  }
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userRepository.findOne({ where: { id: id } });
    if(user) {
      res.status(200).send(user);
    } else {
      throw new Error(`No user found with id: ${id}`);
      
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(`Error fetching user with id: ${id}`);
  }
};


export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, age } = req.body;
  try {
    const user = await userRepository.findOne({ where: { id: id } });
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.age = age;
    await userRepository.save(user);
    res.status(200).send(user);

  } catch (error) {
    res.status(500).send(`Error editing user with id: ${id}`);
  }
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  try {
    userRepository.delete({id: id})
    res.status(200).send(`User with id: ${id} deleted`);
  } catch (error) {
    res.status(500).send(`Error deleting user with id: ${id}`);
  }
};

