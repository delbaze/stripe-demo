import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "db",
    username: "postgres",
    password: "postgres",
    synchronize: true,
    entities: ["src/entities/*.ts"],
    logging: ["query", "error"],
});
