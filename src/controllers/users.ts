import express from "express";
import { deleteUserByEmail, getUsersByRole, updateUserByEmail } from "../db/user";
import { UpdateUserDto } from "../dtos/user/UpdateUser.dto";

export const getAllStudents = async (req: express.Request, res: express.Response) => {
    try {
        const students = await getUsersByRole('Student');

        return res.status(200).json(students);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getAllProfessors = async (req: express.Request, res: express.Response) => {
    try {
        const students = await getUsersByRole('Professor');

        return res.status(200).json(students);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;
        const deleteUser = await deleteUserByEmail(email);
        return res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;
        const values: UpdateUserDto = req.body;

        if (!values) {
            return res.status(400).json({error: "Mising request body"});
        }
        const updatedUser = await updateUserByEmail(email, values);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}