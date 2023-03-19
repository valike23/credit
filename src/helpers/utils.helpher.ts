import { Response } from "express";
import { Ireturn } from "../services/dto/accounts/model";
import { badRequestResponse, serverErrorResponse, successResponse, unAuthorizedResponse } from "./http.response.helpers";

export  function handleResponse(data: Ireturn, res: Response){
    if(data.status == 200) return successResponse(data.data, data.msg, res);
    if(data.status == 401) return unAuthorizedResponse(data.data, data.msg, res);
    if(data.status == 503) return serverErrorResponse(data.data, data.msg, res);
    if(data.status == 400) return badRequestResponse(data.data, data.msg, res);
}