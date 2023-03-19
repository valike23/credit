import { Router } from "express";
import { accountsRouter } from "./accountsRouter";
import { transactionRouter } from "./transactionRouter";


export const apiRouter = Router();

apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/transactions', transactionRouter);

