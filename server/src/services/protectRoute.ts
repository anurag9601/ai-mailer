import { NextFunction, Request, Response } from "express";
import { decrypt } from "./crypto";

export interface UserType {
    id: number;
    email: string;
    password: string;
}

export function productRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const { _Auth } = req.cookies;

        if (!_Auth) {
            res.status(401).json({ error: "User is authorized." });
            return;
        }

        const userAllData = decrypt(_Auth);

        const userRealJSONData: UserType = JSON.parse(userAllData);

        res.user = userRealJSONData;
    } catch (error) {
        console.log(`Error in protect route function ${error}`);
        res.status(401).json({ error: "Something went wrong." });
    } finally {
        next();
    }
}