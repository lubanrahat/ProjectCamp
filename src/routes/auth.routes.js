import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { userRegistionsValidator } from "../validators/index.js";

const router = Router();

router
  .route("/register")
  .post(userRegistionsValidator(), validate, registerUser);

export default router;
