import { Router } from "express";
import { createAccount, login } from "../controllers/accountsController";

export const accountsRouter = Router();

accountsRouter.post('/create-account', createAccount);
accountsRouter.put('/login', login);