import { Router } from "express";
import userRoutes from "./userRoutes";
import reservationRoutes from "./reservationRoutes";

const router : Router = Router ();

router.use("/users", userRoutes);
router.use("/reservations", reservationRoutes);

export default router;