import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgottenPassword,
  getCurrentUser,
  changeCurrentPassword,
} from "../controllers/auth.controllers.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userChangeCurrentPasswordValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password/:resetToken")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword,
  );

router
  .route("/reset-password/:resetToken")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword,
  );

// Secured routes
router.route("/logout").get(verifyJWT, logoutUser);

router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator,
    validate,
    changeCurrentPassword,
  );

export default router;
