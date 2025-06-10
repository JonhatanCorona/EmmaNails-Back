import { Router } from "express";
import { getReservation, getReservationById, reservationCancel, reservationSchedule } from "../controllers/reservationController";




const router : Router = Router();

router.get("/", getReservation);
router.get("/:id",getReservationById );
router.post("/schedule", reservationSchedule);
router.put("/cancel/:id", reservationCancel);


export default router;