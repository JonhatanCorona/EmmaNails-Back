import { Router } from "express";
import { getUser, getUserById, registerUser, userLogin } from "../controllers/userController";


const router: Router = Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;
