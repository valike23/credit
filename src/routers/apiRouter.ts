import { Router } from "express";
import { accountsRouter } from "./accountsRouter";


export const apiRouter = Router();

apiRouter.use('/accounts', accountsRouter);

