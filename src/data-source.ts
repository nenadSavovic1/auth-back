import { DataSource } from "typeorm";
import { ENV } from "./environment"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: ENV.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entity/*.js"], // This allows TypeORM to find compiled files
    subscribers: [],
    migrations: ["src/migration/**/*.ts"], 
})