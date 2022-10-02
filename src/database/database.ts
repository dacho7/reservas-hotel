import { Sequelize } from "sequelize";

export const sequelizeDB = new Sequelize({
  dialect: "postgres",
  database: "reservas",
  username: "postgres",
  password: "reservas1",
  host: "localhost",
  port: 5432,
  logging: false,
  define: {
    timestamps: false,
  },
});
