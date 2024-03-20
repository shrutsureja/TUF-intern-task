import { NextFunction, Request, Response } from "express";
import jsonResponse from "../utils/JsonResponse";
import { codeSnippetSubmitSchema } from "../validations/validationSchemas";

export function submitCodeMiddleware(req : Request, res: Response, next : NextFunction) {
    try {
        const { success } = codeSnippetSubmitSchema.safeParse(req.body);
        if(!success) {
            return res.json(jsonResponse(400, {}, "Invalid input zod error", true));
        }
        next();
    } catch (error) {
        return res.json(jsonResponse(500, error, "Server Error", true))
    }
}