import { Router } from "express";
import { authMiddleware, handlePolicies } from "../../utils/utils.js";
import {
  deleteUser,
  getAllUsers,
  switchRole,
} from "../../controllers/user.controller.js";

const router = Router();

router.get("/", authMiddleware("jwt"), handlePolicies(["ADMIN"]), getAllUsers);

router.put(
  "/premium/:uid",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN"]),
  switchRole
);

router.delete(
  "/:uid",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN"]),
  deleteUser
);

export default router;
