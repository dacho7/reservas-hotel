import Habitacion from "./Habitacion";
import Reservacion from "./Reservacion";
import { sequelizeDB } from "../database/database";

let models = [Habitacion, Reservacion];
models.forEach((model) => model.initialize(sequelizeDB));

export { sequelizeDB, Habitacion, Reservacion };
