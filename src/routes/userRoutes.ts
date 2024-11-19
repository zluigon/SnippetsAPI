import { Router } from "express";
import { createUser, getUsers } from "../controllers/userControllers";
import basicAuth from "../middleware/basicAuth";

const userRouter: Router = Router();

userRouter.post("/", basicAuth, createUser);
userRouter.get("/", getUsers);

export default userRouter;
