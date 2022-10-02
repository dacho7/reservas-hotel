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
 *     n_cliente: 1082412312
 *     num_hab: f4ad-g9fd-l123
 *     metodo_pago: Efectivo
 *     mon_pago: 200
 *  parameters:
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
 *    400:
 *     description: Error al crear la habitacion
 *    500:
 *     description: Error con los datos
 */
router.route("/").post((req, res, next) => {
  controller
    .crearReserva(
      req.body.num_hab,
      req.body.n_cliente,
      req.body.metodo_pago,
      req.body.mon_pago
    )
    .then((nuevaReserva: any) => {
      if (nuevaReserva) {
        res
          .location(req.baseUrl + "/" + String(nuevaReserva.num_reserva))
          .status(201)
          .send(nuevaReserva);
      } else {
        res.status(400).send({ ok: false, err: "habitacion no disponible" });
      }
    })
    .catch((e) => {
      res.status(500).send();
    })
    .finally(next);
});

/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *   summary: obtener los datos de una reserva
 *   parameters:
 *    - $ref: '#/components/parameters/idReserva'
 *   tags: [Reserva]
 *   responses:
 *    200:
 *     description: retorna los datos de una reserva
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Reserva'
 *    400:
 *     description: la reserva no fue encontrada
 */

router.route("/:idRes").get((req, res, next) => {
  controller
    .getReserva(req.params.idRes)
    .then((reserva) => {
      if (reserva) {
        res.status(200).send(reserva);
      } else {
        res.status(400).send({ ok: false, err: "Reserva no encontrada" });
      }
    })
    .finally(next);
});

/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *   summary: actualizar datos de una Reserva
 *   parameters:
 *    - $ref: '#/components/parameters/idReserva'
 *   tags: [Reserva]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Reserva'
 *   responses:
 *    200:
 *     description: obtiene la habitacion actualizada
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Reserva'
 *    400:
 *     description: la habitacion no existe
 *    500:
 *     description: error con los datos
 */
router.route("/:idRes").put((req, res, next) => {
  console.log("parametros", req.params);
  controller
    .editarReserva(
      req.params.idRes,
      req.body.num_hab,
      req.body.n_cliente,
      req.body.estado,
      req.body.metodo_pago,
      req.body.mon_pago
    )
    .then((habitacion) => {
      if (habitacion) {
        res.status(201).send(habitacion);
      } else {
        res
          .status(500)
          .send({ ok: false, err: "no existe esa Reserva o esa habitacion" });
      }
    })
    .catch((e) => {
      res.status(500).send({ ok: false, err: "valor no valido" });
    })
    .finally(next);
});

export default router;
