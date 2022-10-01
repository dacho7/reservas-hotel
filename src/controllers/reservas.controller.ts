import { v4 as uuidv4 } from "uuid";
import { Reservacion, Habitacion } from "../models";

async function getReservaciones(): Promise<any[]> {
  return await Reservacion.findAll({
    attributes: [
      "num_reserva",
      "num_hab",
      "n_cliente",
      "estado",
      "metodo_pago",
      "mon_pago",
    ],
  });
}

async function crearReserva(
  num_hab: string,
  n_cliente: string,
  metodo_pago: string,
  mon_pago: number
): Promise<Reservacion | null> {
  const habitacion = await Habitacion.findOne({
    where: { id_hab: num_hab },
  });
  if (habitacion?.estado === "Disponible") {
    let _reserva = await Reservacion.create({
      num_reserva: uuidv4(),
      num_hab,
      n_cliente,
      metodo_pago,
      mon_pago,
      estado: mon_pago === habitacion.costo ? "Pagado" : "Pendiente",
    });
    habitacion.estado = "Ocupado";
    await habitacion.save();
    return _reserva;
  } else {
    return null;
  }
}

async function getReserva(idReserva: string): Promise<Reservacion | null> {
  const reservaDb = await Reservacion.findOne({
    where: { num_reserva: idReserva },
  });
  if (!reservaDb) {
    return null;
  } else return reservaDb;
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
  // if (_habitacion) {
  //   _habitacion.descripcion = descripcion;
  //   _habitacion.servicios = servicios;
  //   _habitacion.costo = costo;
  //   await _habitacion.save();
  //   return _habitacion;
  // }
  return _habitacion;
  return null;
}

export default {
  getReservaciones,
  crearReserva,
  getReserva,
};
