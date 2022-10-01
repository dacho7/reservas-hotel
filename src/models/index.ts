import Habitacion from "./Habitacion";
import { sequelize } from "../database/database";

let models = [Habitacion];
models.forEach((model) => model.initialize(sequelize));

sequelize.sync({ force: true });

export { sequelize as Database, Habitacion };
