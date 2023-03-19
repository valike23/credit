import { Request, Response } from "express";
import { badRequestResponse, serverErrorResponse, successResponse } from "../helpers/http.response.helpers";
import { handleResponse } from "../helpers/utils.helpher";
import { addUser, loginUser } from "../services/accounts.service";
import { Ilogin } from "../services/dto/accounts/model";
import { isLogin } from "../services/dto/accounts/rules";

export async function createAccount(req: Request , res: Response){
   if(!isLogin(req.body)) return  badRequestResponse({},'email or password is missing', res);

 const resp = await addUser(req.body as Ilogin);
 handleResponse(resp, res);

}

export async function login(req: Request , res: Response){
   if(!isLogin(req.body)) return badRequestResponse({},'email or password is missing', res);
   const resp = await loginUser(req.body);
   handleResponse(resp, res);
}