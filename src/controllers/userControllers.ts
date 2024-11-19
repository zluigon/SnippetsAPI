import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { User } from "../interfaces/user";

let users: User[] = [];
let nextUserId = 1;

/**
 * @description Create user
 * @route       POST api/users
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ error: "Missing required fields" });
		return;
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser: User = {
		id: nextUserId++,
		email,
		password: hashedPassword,
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

/**
 * @description Get users
 * @route       GET api/users
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
	res.json(users);
});
