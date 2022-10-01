import { Router } from "express";
import controller from "../controllers/habitaciones.controller";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Habitacion:
 *    type: object
 *    propierties:
 *     id_hab:
 *      type: string
 *      description: relacionado a la habitacion
 *     descripcion:
 *      type: string
 *      description: descripcion de la habitacion
 *     servicios:
 *      type: string
 *      description: Servicios con los que cuenta la habitacion
 *     estado:
 *      type: string
 *      description: Estado de la habitacion Disponible | Ocupado
 *     costo:
 *      type: number
 *      description: Costo de la habitacion
 *    required:
 *     - descripcion
 *     - servicios
 *     - costo
 *    example:
 *     descripcion: habitacion para 2 personas, vista a la playa
 *     servicios: desayuno, almuerzo
 *     estado: Disponible
 *     costo: 200
 */

/**
 * @swagger
 * /api/habitaciones:
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
router.route("/").get((req, res, next) => {
  controller
    .getTodasHabitaciones()
    .then((classes) => res.status(200).send(classes))
    .finally(next);
});

/**
 * @swagger
 * /api/habitaciones/disponibles:
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
router.route("/disponibles").get((req, res, next) => {
  controller
    .getHabitacionesDisponibles()
    .then((classes) => res.status(200).send(classes))
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
    .then((nuevaHabitacion) =>
      res
        .location(req.baseUrl + "/" + String(nuevaHabitacion.id_hab))
        .status(201)
        .send(nuevaHabitacion)
    )
    .catch((e) => {
      res.status(500).send();
    })
    .finally(next);
});

export default router;
