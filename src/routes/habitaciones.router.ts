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
 *      description: identificacion relacionado a la habitacion
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
 *     id_hab: a4f8fe52-dda5-42ed-8a1c-b16c6a016da0
 *     descripcion: habitacion para 2 personas, vista a la playa
 *     servicios: desayuno, almuerzo
 *     estado: Disponible
 *     costo: 200
 *  parameters:
 *   idHabitacion:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: string
 *    description: id de una habitacion
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
 *   summary: Obten una lista de todas las habitaciones disponibles
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
 *   summary: Obten una lista de todas las habitaciones ocupadas
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
      res.status(500).send({ ok: false, err: "costo no valido" });
    })
    .finally(next);
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *  put:
 *   summary: actualizar datos de una habitacion
 *   parameters:
 *    - $ref: '#/components/parameters/idHabitacion'
 *   tags: [Habitacion]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Habitacion'
 *   responses:
 *    200:
 *     description: obtiene la habitacion actualizada
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Habitacion'
 *    400:
 *     description: la habitacion no existe
 *    500:
 *     description: error con los datos
 */
router.route("/:idHabitacion").put((req, res, next) => {
  controller
    .editarHabitacion(
      req.params.idHabitacion,
      req.body.descripcion,
      req.body.servicios,
      req.body.estado,
      req.body.costo
    )
    .then((habitacion) => {
      if (habitacion) {
        res.status(201).send(habitacion);
      } else {
        res.status(500).send({ ok: false, err: "no existe esa habitacion" });
      }
    })
    .catch((e) => {
      res.status(500).send({ ok: false, err: "costo no valido" });
    })
    .finally(next);
});

export default router;
