import express from "express";
import { createStudyPlan, deleteStudyPlan, getPlanByFacultyAndCourse, getStudyPlan, updateStudyPlan } from "../db/studyPlan";
import { CreateStudyPlanDto } from "../dtos/studyPlan/CreateStudyPlan.dto";
import { UpdateStudyPlanDto } from "../dtos/studyPlan/UpdateStudyPlan.dto";

export const getOneStudyPlan = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const studyPlan = await getStudyPlan(id);
        return res.status(200).json(studyPlan);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getFacultyPlan = async( req: express.Request, res: express.Response)=>{
    try {
        const faculty = req.params.faculty;
        const course = parseInt(req.params.course);
        if(!faculty || !course){
            return res.status(400).json('Missing parameter');
        }
        const plan = await getPlanByFacultyAndCourse(faculty, course);
        return res.status(200).json(plan);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const createPlan = async( req: express.Request, res: express.Response)=>{
    try {
        const values: CreateStudyPlanDto = req.body;
        const plan = await createStudyPlan(values);
        return res.status(200).json(plan);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const deletePlan = async (req: express.Request, res: express.Response) =>{
    try {
        const faculty = req.params.faculty;
        const course = parseInt(req.params.course);
        if(!faculty || !course){
            return res.status(400).json('Missing parameter');
        }
        const plan = await getPlanByFacultyAndCourse(faculty, course);
        const planIds = plan.map(item => item._id.toString());
        const deletedPlan = await deleteStudyPlan(planIds);
        return res.status(200).json(deletedPlan);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const updatePlan = async( req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const values: UpdateStudyPlanDto = req.body;
        if(!values){
            return res.status(400).json('Missing parameter');
        }
        const plan = await updateStudyPlan(id, values);
        return res.status(200).json(plan);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}