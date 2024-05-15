import express from "express";
import { createGradebook, deleteGradebook, getDisciplineGradebook, getGradebook, getStudentGradebook, updateGradebook } from "../db/gradebook";
import { CreateGradebookDto } from "../dtos/gradebook/CreateGradebook.dto";
import { UpdateGradebookDto } from "../dtos/gradebook/UpdateGradebook.dto";

export const getGrade = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;      
        const grade = await getGradebook(id);
        return res.status(200).json(grade);  
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getStudentGrades = async(req: express.Request, res: express.Response)=>{
    try {
        const {studentId} = req.params;
        const grades = await getStudentGradebook(studentId);
        return res.status(200).json(grades);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const getDisciplineGrades = async(req: express.Request, res: express.Response)=>{
    try {
        const {disciplineId} = req.params;
        const grades = await getDisciplineGradebook(disciplineId);
        return res.status(200).json(grades);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const createGrade = async (req: express.Request, res: express.Response) => {
    try {
        const values: CreateGradebookDto = req.body;
        const createdGrade = await createGradebook(values);
        return res.status(200).json(createdGrade);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const deleteGrades = async (req: express.Request, res: express.Response) =>{
    try {
        const studentId = req.params.studentId;
        const gradebook = await getStudentGradebook(studentId);
        const gradesIds = gradebook.map(grade => grade._id.toString());
        const deletedGradebook = await deleteGradebook(gradesIds);
        return res.status(200).json(deletedGradebook);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const updateGrade = async( req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const values: UpdateGradebookDto = req.body;
        if(!values){
            return res.status(400).json('Missing parameter');
        }
        const grade = await updateGradebook(id, values);
        return res.status(200).json(grade);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}