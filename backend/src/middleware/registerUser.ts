import { NextFunction, Request, Response } from "express";
import jsonResponse from "../utils/JsonResponse";
import { userRegisterSchema } from "../validations/validationSchemas";

export function registerUserMiddleware( req : Request, res : Response, next : NextFunction){
    try {
        const { success } = userRegisterSchema.safeParse(req.body);
        if(!success){
            return res.json(jsonResponse(400, {}, "Invalid Input Zod error", true));
        }
        if(req.body.username.split(" ").length > 1){
            return res.json(jsonResponse(400, {}, "Username cannot contain spaces", true));
        }
        next();
    } catch (error) {
        res.json(jsonResponse(500, error, "Server Error", true));
    }
}