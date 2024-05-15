import express from 'express';
import {get, merge} from 'lodash';
import { getUserBySessionToken } from '../db/user';

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        
        const sessionToken = req.cookies['User-auth'];
        if(!sessionToken){
            return res.status(404).json({error: "Cookies not found"});
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.status(404).json({error:"User not found"});
        }
        merge(req, {identity: existingUser});
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const isProfessor = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        const prof = 'Professor';
        const currentRole = get(req, 'identity.role') as string | undefined;
        if (!currentRole || currentRole !== prof) {
            return res.status(405).json({ error: 'Access denied. User is not a professor' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}
