import express from 'express';

import { AES } from 'crypto-ts';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

import { createUser, getUserByEmail, getUserByFullname } from '../db/user';
import { CreateUserDto } from '../dtos/user/CreateUser.dto';
import { LoginUserDto } from '../dtos/user/LoginUser.dto';

dotenv.config();

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const values: LoginUserDto = req.body;

        const existingUser = await getUserByEmail(values.email).select('password');
        if (!existingUser) {
            return res.status(400).json({ error: "User doenst exist" });
        }
    
        if (!await bcrypt.compare(values.password, existingUser.password)) {
            console.log(existingUser.password);
            
            return res.status(400).json({ error: "Wrong password" });
        }
        existingUser.sessionToken = AES.encrypt(existingUser.fullname, process.env.SECRET_KEY).toString();
        await existingUser.save();
        res.cookie('User-auth', existingUser.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(existingUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}



export const register = async (req: express.Request, res: express.Response) => {
    try {
        const values: CreateUserDto = req.body;
        const existingUser = await getUserByFullname(values.fullname);
        if (existingUser) {
            return res.status(200).json({ err: 'User already exist' });
        }
        const encryptedPassword = (await bcrypt.hash(values.password, 10)).toString();
        values.password = encryptedPassword;

        const newUser = await createUser(values);

        return res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}