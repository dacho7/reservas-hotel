import { Router } from "express";
import controller from "../controllers/habitaciones.controller";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Reserva:
 *    type: object
 *    propierties:
 *     num_reserva:
 *      type: string
 *      description: identificacion relacionado a la Reserva
 *     num_hab:
 *      type: string
 *      description: identifcacion relacionado a la Habitacion a la cual esta reservando
 *     n_cliente:
 *      type: string
 *      description: documento relacionado con el cliente
 *     estado:
 *      type: string
 *      description: Estado de la reserva puede ser Pendiente, Pagado, Eliminado
 *     metodo_pago:
 *      type: string
 *      description: Metodo con el cual se realiza el pago de la reserva
 *     mon_pago:
 *      type: number
 *      description: Valor que esta pagando al realiar la reserva
 *    required:
 *     - num_reserva
 *     - num_hab
 *     - n_cliente
 *     - metodo_pago
 *     - mon_pago
 *    example:
 *     num_reserva: Reserva para 2 personas, vista a la playa
 *     num_hab: desayuno, almuerzo
 *     metodo_pago: Disponible
 *     mon_pago: 200
 *  paremeters:
 *   idReserva:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: string
 *    description: id de una reservacion
 */

/**
 * @swagger
 * /api/reservas:
 *  get:
 *   summary: Obten una lista de todas las Reservaes
 *   tags: [Reserva]
 *   responses:
 *    200:
 *     descripción: lista de Reservaes
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Reserva'
 */
router.route("/").get((req, res, next) => {
  controller
    .getTodasHabitaciones()
    .then((classes) => res.status(200).send(classes))
    .finally(next);
});

/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *   summary: Obten informacion de una reservacion
 *   tags: [Reserva]
 *   parameters:
 *    - $ref: '#/components/paremeters/idReserva'
 *   responses:
 *    200:
 *     description: datos de una tarea con id encontrada
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Reserva'
 *    400:
 *     description: la tarea no fue encontrada
 */
router.route("/:id").get((req, res, next) => {
  controller
    .getHabitacionesDisponibles()
    .then((reserva) => {
      if (reserva) {
        res.status(200).send(reserva);
      } else {
        res.status(400).send();
      }
    })
    .finally(next);
});

/**
 * @swagger
 * /api/habitaciones/ocupadas:
 *  get:
 *   summary: Obten una lista de todas las habitaciones
 *   tags: [Habitacion]
 *   responses:
 *    200:
 *     descripción: lista de habitaciones
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Habitacion'
 */
router.route("/ocupadas").get((req, res, next) => {
  controller
    .getHabitacionesOcupadas()
    .then((classes) => res.status(200).send(classes))
    .finally(next);
});

/**
 * @swagger
 * /api/habitaciones:
 *  post:
 *   summary: Crea una nueva habitacion
 *   tags: [Habitacion]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Habitacion'
 *   responses:
 *    200:
 *     descripción: Habitacion creada
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Habitacion'
 *    500:
 *     description: Error al crear la habitacion
 */
router.route("/").post((req, res, next) => {
  controller
    .crearHabitacion(
      req.body.descripcion,
      req.body.servicios,
      req.body.estado,
      req.body.costo
    )
    .then((nuevaHabitacion) => {
      if (nuevaHabitacion !== null) {
        res
          .location(req.baseUrl + "/" + String(nuevaHabitacion.id_hab))
          .status(201)
          .send(nuevaHabitacion);
      } else {
        res.status(400).send();
      }
    })
    .catch((e) => {
      res.status(500).send();
    })
    .finally(next);
});

export default router;
