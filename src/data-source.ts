import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entity/*.js"], // This allows TypeORM to find compiled files
    subscribers: [],
    migrations: [],
})