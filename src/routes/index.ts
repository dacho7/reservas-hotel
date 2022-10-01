import { Router } from "express";

import habitacionesRoutes from "./habitaciones.router";
import reservasRoutes from "./reservas.router";

const router = Router();

router.use("/habitaciones", habitacionesRoutes);
router.use("/reservas", reservasRoutes);

export default router;
