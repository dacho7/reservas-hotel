import { where } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Habitacion } from "../models";

async function getTodasHabitaciones(): Promise<any[]> {
  return await Habitacion.findAll({
    attributes: ["id_hab", "descripcion", "servicios", "estado", "costo"],
  });
}

async function getHabitacionesDisponibles(): Promise<any[]> {
  return await Habitacion.findAll({
    attributes: ["id_hab", "descripcion", "servicios", "estado", "costo"],
    where: { estado: "Disponible" },
  });
}

async function getHabitacionesOcupadas(): Promise<any[]> {
  return await Habitacion.findAll({
    attributes: ["id_hab", "descripcion", "servicios", "estado", "costo"],
    where: { estado: "Ocupado" },
  });
}

async function crearHabitacion(
  descripcion: string,
  servicios: string,
  estado: string,
  costo: number
): Promise<Habitacion> {
  let _habitacion = await Habitacion.create({
    id_hab: uuidv4(),
    descripcion,
    servicios,
    estado,
    costo,
  });
  return _habitacion;
}

export default {
  getTodasHabitaciones,
  getHabitacionesDisponibles,
  getHabitacionesOcupadas,
  crearHabitacion,
};
