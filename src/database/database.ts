import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "reservas1",
  port: 5543,
  define: {
    timestamps: false,
  },
});
