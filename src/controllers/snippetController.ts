import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Snippet } from "../interfaces/snippet";
import seedData from "../seedData.json";

let snippets: Snippet[] = seedData;
let nextId = seedData.length + 1;

/**
 * @description Create snippets
 * @route       POST api/snippets
 */

export const createSnippet = asyncHandler(
  async (req: Request, res: Response) => {
    const { language, code } = req.body;

    if (!language || !code) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newSnippet: Snippet = {
      id: nextId++,
      language: language,
      code: code,
    };
    snippets.push(newSnippet);
    res.status(201).json(newSnippet);
  }
);

/**
 * @description Get snippets
 * @route       GET api/snippets
 */

export const getSnippets = asyncHandler(async (req: Request, res: Response) => {
  const { lang } = req.query;
  if (lang) {
    res.json(snippets.filter((s) => s.language === lang.toString()));
  } else {
    res.json(snippets);
  }
});

/**
 * @description Get snippet by id
 * @route       GET api/snippets/:id
 */

export const getSnippetById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const snippet = snippets.find((s) => s.id === id);
    if (snippet) {
      res.json(snippet);
    } else {
      res.status(404).json({ error: "Snippet not found" });
      return;
    }
  }
);
