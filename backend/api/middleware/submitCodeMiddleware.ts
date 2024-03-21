import { NextFunction, Request, Response } from "express";
import jsonResponse from "../utils/JsonResponse";
import { codeSnippetSubmitSchema } from "../Functions/submitCodeValidationFunction";

export function submitCodeMiddleware(req : Request, res: Response, next : NextFunction) {
    try {
        const response = codeSnippetSubmitSchema.safeParse(req.body);
        if(!response.success) {
            return res.json(jsonResponse(400, response, "Invalid input zod error", true));
        }
        next();
    } catch (error) {
        return res.json(jsonResponse(500, error, "Server Error", true))
    }
}