import { Router } from 'express';
import jwtAuth from '../middleware/jwtAuth';
import {
  createSnippet,
  getSnippetById,
  getSnippets,
} from '../controllers/snippetController';

const snippetRouter: Router = Router();

snippetRouter.post('/', jwtAuth, createSnippet);
snippetRouter.get('/', getSnippets);
snippetRouter.get('/:id', getSnippetById);

export default snippetRouter;
