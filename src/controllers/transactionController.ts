import { Request, Response } from "express";
import { Iuser } from "../helpers/knex/users/user.schema";
import { handleResponse } from "../helpers/utils.helpher";
import { Itransfer } from "../services/dto/accounts/model";
import { transactionsService } from "../services/transactions.service";


export async function transferFundsCtrl(req: Request, res: Response){
 
        const transfer : Itransfer = req.body;
        const user: Iuser = req["user"];
        console.log('enter controller', user, transfer);
        const resp =  await new transactionsService().transferFund(transfer, user.id);
        handleResponse(resp, res);
   
}

export async function withdrawalCtrl(req: Request, res: Response){

}

export async function creditCtrl(req: Request, res: Response){

}