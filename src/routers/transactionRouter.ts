import { Router } from "express";
import { creditCtrl, transferFundsCtrl, withdrawalCtrl } from "../controllers/transactionController";
import { authMiddleware } from "../helpers/auth.helper";

export const transactionRouter = Router();

transactionRouter.put('/transfer',authMiddleware, transferFundsCtrl)
transactionRouter.put('/credit', creditCtrl)
transactionRouter.put('/withdrawal', withdrawalCtrl)