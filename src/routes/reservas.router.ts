import { Router } from "express";
import controller from "../controllers/reservas.controller";

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
 *     - num_hab
 *     - n_cliente
 *     - metodo_pago
 *     - mon_pago
 *    example:
 *     n_cliente: 3d4s-43243-9saf
 *     num_hab: f4ad-g9fd-l123
 *     metodo_pago: Efectivo
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
    .getReservaciones()
    .then((resrevas) => res.status(200).send(resrevas))
    .finally(next);
});

/**
 * @swagger
 * /api/reservas:
 *  post:
 *   summary: Crea una nueva Reserva
 *   tags: [Reserva]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Reserva'
 *   responses:
 *    200:
 *     descripción: Habitacion creada
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Reserva'
 *    500:
 *     description: Error al crear la habitacion
 */
router.route("/").post((req, res, next) => {
  controller
    .crearReserva(
      req.body.num_hab,
      req.body.n_cliente,
      req.body.metodo_pago,
      req.body.mon_pago
    )
    .then((nuevaReserva: any) =>
      res
        .location(req.baseUrl + "/" + String(nuevaReserva.num_reserva))
        .status(201)
        .send(nuevaReserva)
    )
    .catch(() => {
      res.status(500).send();
    })
    .finally(next);
});

export default router;
