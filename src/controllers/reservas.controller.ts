import { v4 as uuidv4 } from "uuid";
import Habitacion from "../models/Habitacion";
import Reservacion from "../models/Reservacion";

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
  const _habitacion = await Habitacion.findOne({
    where: { id_hab: num_hab },
  });
  if (_habitacion?.estado === "Disponible") {
    let _reserva = await Reservacion.create({
      num_reserva: uuidv4(),
      num_hab,
      n_cliente,
      metodo_pago,
      mon_pago,
      estado: mon_pago === _habitacion.costo ? "Pagado" : "Pendiente",
    });
    _habitacion.estado = "Ocupado";
    await _habitacion.save();
    return _reserva;
  } else {
    return null;
  }
}

async function getReserva(idReserva: string): Promise<Reservacion | null> {
  return await Reservacion.findOne({
    where: { num_reserva: idReserva },
  });
}

async function editarReserva(
  num_reserva: string,
  num_hab: string,
  n_cliente: string,
  estado: string,
  metodo_pago: string,
  mon_pago: number
): Promise<Reservacion | null> {
  let _reserva = await Reservacion.findOne({ where: { num_reserva } });
  let _habitacion = await Habitacion.findOne({ where: { id_hab: num_hab } });

  //validacion que existan los registros, en caso de cambiar de habitacon debe estar disponible
  if (
    _reserva &&
    _habitacion &&
    (_reserva.num_hab === num_hab ||
      (_reserva.num_hab !== num_hab && _habitacion.estado === "Disponible"))
  ) {
    _reserva.num_hab = num_hab;
    _reserva.n_cliente = n_cliente;
    _reserva.estado = estado;
    _reserva.metodo_pago = metodo_pago;
    _reserva.mon_pago = mon_pago;

    _habitacion.estado = "Ocupado";

    await _habitacion.save();
    await _reserva.save();
    return _reserva;
  }
  return null;
}

export default {
  getReservaciones,
  crearReserva,
  getReserva,
  editarReserva,
};
