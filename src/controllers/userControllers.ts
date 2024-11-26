import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../interfaces/user';

dotenv.config();

let users: User[] = [];
let nextUserId = 1;

const secret = process.env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: { email: string; password: string };
}

/**
 * @description Create user
 * @route       POST api/users
 * @access      Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: 'Missing required fields' });
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser: User = {
    id: nextUserId++,
    email: email,
    password: hashedPassword,
  };
  users.push(newUser);

  const { password: _, ...user } = newUser;

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret!, {
    expiresIn: '24h',
  });

  res.status(201).json({ user, token });
});

/**
 * @description Get users
 * @route       GET api/users
 * @access      Private
 */
export const getUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const reqUser = req.user;

    const foundUser = users.find((user) => user.email === reqUser!.email);
    if (!foundUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { password, ...user } = foundUser;
    res.status(200).json(user);
  },
);

/**
 * @description Login user
 * @route 		POST api/users/login
 * @access 		Public
 * */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = users.find((user) => user.email === email);
  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const { password: _, ...user } = foundUser;

  const token = jwt.sign(
    { id: foundUser.id, email: foundUser.email },
    secret!,
    { expiresIn: '24h' },
  );

  res.status(200).json({ user, token });
});
