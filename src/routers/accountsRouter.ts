import { Router } from "express";
import { createAccountCtrl, loginCtrl } from "../controllers/accountsController";

export const accountsRouter = Router();

accountsRouter.post('/create-account', createAccountCtrl);
accountsRouter.put('/login', loginCtrl);