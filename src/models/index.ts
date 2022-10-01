import Habitacion from "./Habitacion";
import Reservacion from "./Reservacion";
import { sequelize } from "../database/database";

let models = [Habitacion, Reservacion];
models.forEach((model) => model.initialize(sequelize));

sequelize.sync({ force: true });

export { sequelize as Database, Habitacion, Reservacion };
