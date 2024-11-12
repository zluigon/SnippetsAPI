import { Router } from "express";
import {
  createSnippet,
  getSnippetById,
  getSnippets,
} from "../controllers/snippetController";

const snippetRouter: Router = Router();

snippetRouter.post("/snippets", createSnippet);
snippetRouter.get("/snippets", getSnippets);
snippetRouter.get("/snippets/:id", getSnippetById);

export default snippetRouter;
