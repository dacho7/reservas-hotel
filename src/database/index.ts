import { Sequelize } from "sequelize-typescript";
import Habitacion from "../models/Habitacion";
import Reservacion from "../models/Reservacion";

const sequelizeDB = new Sequelize({
  dialect: "mysql",
  database: "testdb",
  username: "user",
  password: "12345678",
  host: "localhost",
  port: 3306,
  logging: false,
  define: {
    timestamps: false,
  },
});

sequelizeDB.addModels([Habitacion, Reservacion]);

export default sequelizeDB;
