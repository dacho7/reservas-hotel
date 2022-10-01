import { v4 as uuidv4 } from "uuid";
import { Reservacion } from "../models";

async function getReservaciones(): Promise<any[]> {
  return await Reservacion.findAll({
    order: [["id_hab", "ASC"]],
    attributes: ["id_hab", "descripcion", "servicios", "estado", "costo"],
  });
}

async function getReserva(idReserva: string): Promise<Reservacion | null> {
  const reservaDb = await Reservacion.findOne({
    where: { num_reserva: idReserva },
  });
  if (!reservaDb) {
    return null;
  }
  return reservaDb;
}

async function crearHabitacion(
  descripcion: string,
  servicios: string,
  costo: number
): Promise<Reservacion> {
  let _habitacion = await Reservacion.create({
    id_hab: uuidv4(),
    descripcion,
    servicios,
    costo,
  });
  return _habitacion;
}

async function eliminarHabitacion(id_hab: string): Promise<Reservacion | null> {
  let _habitacion = await Reservacion.findOne({ where: { id_hab } });
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
): Promise<Reservacion | null> {
  let _habitacion = await Reservacion.findOne({ where: { id_hab } });
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
