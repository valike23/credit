import { Request, Response } from "express";
import { Iuser } from "../helpers/knex/users.helpher";
import { handleResponse } from "../helpers/utils.helpher";
import { Itransfer } from "../services/dto/accounts/model";
import { WalletService } from "../services/wallet.service";

let walletService = new WalletService();
export async function transferFundsCtrl(req: Request, res: Response){
 
        const transfer : Itransfer = req.body;
        const user: Iuser = req["user"];
        console.log('enter controller', user, transfer);
        const resp =  await walletService.transferFunds( user.id, transfer.accountNumber, transfer.amount);
        handleResponse(resp, res);
   
}

export async function withdrawalCtrl(req: Request, res: Response){
    const {amount} = req.body;
    const user: Iuser = req["user"];
    const resp =  await walletService.withdrawFunds( user.id, amount);
    handleResponse(resp, res);
    
}

export async function creditCtrl(req: Request, res: Response){
    const {amount}= req.body;
    const user: Iuser = req["user"];
    const resp =  await walletService.fundUser(user.id, amount);
    handleResponse(resp, res);
}