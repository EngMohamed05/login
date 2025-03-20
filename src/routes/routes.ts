import { Router } from "express";
import { registerController } from "../controllers/register";
import { loginController } from "../controllers/login";
import { getHome, getLogin, getRegister } from "../controllers/views";

const router = Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/register", getRegister);

router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;
