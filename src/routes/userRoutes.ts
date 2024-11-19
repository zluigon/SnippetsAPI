import { Router } from "express";
import { createUser, getUser } from "../controllers/userControllers";
import basicAuth from "../middleware/basicAuth";

const userRouter: Router = Router();

userRouter.post("/", basicAuth, createUser);
userRouter.get("/", basicAuth, getUser);

export default userRouter;
