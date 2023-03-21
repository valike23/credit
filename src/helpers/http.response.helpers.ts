import { Response } from "express";

export function unAuthorizedResponse(err: any, msg: string, res: Response): void {
    res.status(401).json({msg});
    // you can log the error if you need to or log other details
    console.log(err);
}
export function badRequestResponse(err: any, msg: string, res: Response): void {
    res.status(400).json({msg});
    // you can log the error if you need to or log other details
    console.log(err);
}

export function serverErrorResponse(err: any, msg: string, res: Response): void {
    res.status(503).json({msg});
    // you can log the error if you need to or log other details
    console.log(err);
}

export function successResponse(data: any, msg: string, res: Response): void {
    res.json({data, msg});
}

