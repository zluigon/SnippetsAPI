import { Router } from "express";
import {
	createSnippet,
	getSnippetById,
	getSnippets,
} from "../controllers/snippetController";

const snippetRouter: Router = Router();

snippetRouter.post("/", createSnippet);
snippetRouter.get("/", getSnippets);
snippetRouter.get("/:id", getSnippetById);

export default snippetRouter;
