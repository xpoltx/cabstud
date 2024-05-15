import express from 'express';
import { createDiscipline, deleteDiscipline, getDisciplineById, getProfessorDisciplines, updateDiscipline,getFacultyDisciplines} from '../db/discipline';
import { CreateDisciplineDto } from '../dtos/discipline/CreateDiscipline.dto';
import { UpdateDisciplineDto } from '../dtos/discipline/UpdateDiscipline.dto';

export const getDiscipline = async (req: express.Request, res: express.Response)=>{
    try {
        const {id}= req.params;
        const discipline = await getDisciplineById(id);
        return res.status(200).json(discipline);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getDisciplinesByProfessor = async (req: express.Request, res: express.Response)=>{
    try {
        const {id}= req.params;
        const disciplines = await getProfessorDisciplines(id);
        return res.status(200).json(disciplines);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getDisciplinesByFaculty = async (req: express.Request, res: express.Response)=>{
    try {
        const {faculty}= req.params;
        const disciplines = await getFacultyDisciplines(faculty);
        return res.status(200).json(disciplines);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const createDiscip = async (req: express.Request, res: express.Response) => {
    try {
        const values: CreateDisciplineDto = req.body;
        const createdDiscipline = await createDiscipline(values);
        return res.status(200).json(createdDiscipline);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const deleteDiscip = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const deleted = await deleteDiscipline(id);

        return res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const updateDiscip = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const values: UpdateDisciplineDto = req.body;
        if(!values){
            return res.status(400).json('Missing parameter');
        }
        const updatedDiscipline = await updateDiscipline(id, values);
        return res.status(200).json(updatedDiscipline);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}