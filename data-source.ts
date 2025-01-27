import { DataSource } from "typeorm";
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "lenard",
    password: "password",
    database: "api",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})