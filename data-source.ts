import { DataSource } from "typeorm";
import { Users } from "./entity/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "lenard",
    password: "password",
    database: "api",
    synchronize: true,
    logging: true,
    entities: [Users],
    subscribers: [],
    migrations: [],
})