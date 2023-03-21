import { Request, Response } from "express";
import { badRequestResponse, serverErrorResponse, successResponse } from "../helpers/http.response.helpers";
import { handleResponse } from "../helpers/utils.helpher";
import { addUser, loginUser } from "../services/accounts.service";
import { Iregister } from "../services/dto/accounts/model";
import { isLogin, isRegister } from "../services/dto/accounts/rules";

export async function createAccountCtrl(req: Request , res: Response){
   if(!isRegister(req.body)) return  badRequestResponse({},'email or password is missing', res);

 const resp = await addUser(req.body as Iregister);
 handleResponse(resp, res);

}

export async function loginCtrl(req: Request , res: Response){
   if(!isLogin(req.body)) return badRequestResponse({},'email or password is missing', res);
   const resp = await loginUser(req.body);
   handleResponse(resp, res);
}