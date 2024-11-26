import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/userControllers";
import basicAuth from "../middleware/basicAuth";
import jwtAuth from "../middleware/jwtAuth";

const userRouter: Router = Router();

// Public routes
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);

// Private routes
userRouter.get("/", jwtAuth, getUser);

export default userRouter;
