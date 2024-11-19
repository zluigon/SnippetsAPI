import { Router } from "express";
import { createUser, getUsers } from "../controllers/userControllers";
import basicAuth from "../middleware/basicAuth";
import exp from "constants";

const userRouter: Router = Router();

// userRouter.use(basicAuth);

userRouter.post("/", createUser);
userRouter.get("/", getUsers);

export default userRouter;