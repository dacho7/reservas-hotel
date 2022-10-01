import { v4 as uuidv4 } from "uuid";
import { Habitacion } from "../models";

async function getReservaciones(): Promise<any[]> {
  return await Habitacion.findAll({
    order: [["id_hab", "ASC"]],
    attributes: ["id_hab", "descripcion", "servicios", "estado", "costo"],
  });
}

async function crearHabitacion(
  descripcion: string,
  servicios: string,
  costo: number
): Promise<Habitacion> {
  let _habitacion = await Habitacion.create({
    id_hab: uuidv4(),
    descripcion,
    servicios,
    costo,
  });
  return _habitacion;
}

async function eliminarHabitacion(id_hab: string): Promise<Habitacion | null> {
  let _habitacion = await Habitacion.findOne({ where: { id_hab } });
  if (_habitacion) {
    await _habitacion.destroy();
    return _habitacion;
  }
  return null;
}

async function updateHabitacion(
  id_hab: string,
  descripcion: string,
  servicios: string,
  costo: number
): Promise<Habitacion | null> {
  let _habitacion = await Habitacion.findOne({ where: { id_hab } });
  if (_habitacion) {
    _habitacion.descripcion = descripcion;
    _habitacion.servicios = servicios;
    _habitacion.costo = costo;
    await _habitacion.save();
    return _habitacion;
  }
  return null;
}

export default {
  getReservaciones,
};
