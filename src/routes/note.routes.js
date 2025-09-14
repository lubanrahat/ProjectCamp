import { Router } from "express";

import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middlewares.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import { notesValidator } from "../validators/index.js";
import validate from "../middlewares/validator.middlewares.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getNotes)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    notesValidator(),
    validate,
    createNote,
  );

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRoles), getNoteById)
  .put(
    AvailableUserRoles([UserRolesEnum.ADMIN]),
    notesValidator(),
    validate,
    updateNote,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

export default router;
