import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export default knex({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
  },
});
