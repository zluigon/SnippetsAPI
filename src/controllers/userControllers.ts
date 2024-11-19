import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { User } from "../interfaces/user";

let users: User[] = [];
let nextUserId = 1;

interface AuthenticatedRequest extends Request {
	user?: { email: string; password: string };
}

/**
 * @description Create user
 * @route       POST api/users
 */
export const createUser = asyncHandler(
	async (req: AuthenticatedRequest, res: Response) => {
		const reqUser = req.user;

		if (!reqUser!.email || !reqUser!.password) {
			res.status(400).json({ error: "Missing required fields" });
			return;
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(reqUser!.password, saltRounds);

		const newUser: User = {
			id: nextUserId++,
			email: reqUser!.email,
			password: hashedPassword,
		};
		users.push(newUser);
		res.status(201).json(newUser);
	}
);

/**
 * @description Get users
 * @route       GET api/users
 */
export const getUser = asyncHandler(
	async (req: AuthenticatedRequest, res: Response) => {
		const reqUser = req.user;

		const foundUser = users.find((user) => user.email === reqUser!.email);
		if (!foundUser) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		const { password, ...userWithoutPassword } = foundUser;
		res.status(200).json(userWithoutPassword);
	}
);
