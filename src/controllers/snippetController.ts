import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { encrypt, decrypt } from '../utils/encrypt';
import { Snippet } from '../interfaces/snippet';
import seedData from '../seedData.json';

dotenv.config();

let snippets: Snippet[] = seedData.map((s) => ({
  ...s,
  code: encrypt(s.code),
}));
let nextSnipppetId = seedData.length + 1;

const secret = process.env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

/**
 * @description Create snippets
 * @route       POST api/snippets
 * @access      Public
 */

export const createSnippet = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { language, code } = req.body;
    const reqUser = req.user;

    if (!language || !code) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const newSnippet: Snippet = {
      id: nextSnipppetId++,
      language,
      code,
      userId: reqUser?.id,
    };
    snippets.push({ ...newSnippet, code: encrypt(newSnippet.code) });

    res.status(201).json(newSnippet);
  },
);

/**
 * @description Get snippets
 * @route       GET api/snippets
 * @access      Public
 */

export const getSnippets = asyncHandler(async (req: Request, res: Response) => {
  const { lang } = req.query;
  if (lang) {
    res.json(
      snippets
        .filter((s) => s.language === lang.toString())

        // decrypt all matched snippets
        .map((s) => ({ ...s, code: decrypt(s.code) })),
    );
  } else {
    res.json(snippets);

    // decrypt all snippets
    res.json(snippets.map((s) => ({ ...s, code: decrypt(s.code) })));
  }
});

/**
 * @description Get snippet by id
 * @route       GET api/snippets/:id
 * @access      Public
 */

export const getSnippetById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const snippet = snippets.find((s) => s.id === id);
    if (snippet) {
      res.json({ ...snippet, code: decrypt(snippet.code) });
    } else {
      res.status(404).json({ error: 'Snippet not found' });
      return;
    }
  },
);
