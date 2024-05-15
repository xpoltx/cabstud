import express from "express";
import { getGroupList, getStudentInfo, deleteStudentInfo, updateStudentInfo, createStudentInfo } from "../db/studentInfo";
import { UserModel } from "../db/user";
import { UpdateStudentInfoDto } from "../dtos/studentInfo/UpdateStudentInfo.dto";
import { CreateStudentInfoDto } from "../dtos/studentInfo/CreateStudentInfo.dto";

export const getStudentInformation = async (req: express.Request, res: express.Response) => {
    try {
        const {studentId} = req.params;
        const studentInfo = await getStudentInfo(studentId);

        return res.status(200).json(studentInfo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const getGroup = async (req: express.Request, res: express.Response) => {
    try {
        const {groupName} = req.params;
        const students = await getGroupList(groupName);
        const studentId = students.map(student => student.userId);

        const studentNames = await UserModel.find({ _id: { $in: studentId } }).select('fullname');

        const groupList = {
            students: students,
            studentNames: studentNames.map(student => student.fullname),
        };
        return res.status(200).json(groupList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const deleteStudentInformation = async (req: express.Request, res: express.Response) =>{
    try {
        const {studentId} = req.params;
        const deleted = await deleteStudentInfo(studentId);

        return res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const updateStudentInformation = async (req: express.Request, res: express.Response) => {
    try {
        const {studentId} = req.params;
        const values: UpdateStudentInfoDto = req.body;
        if(!values){
            return res.status(400).json('Missing parameter');
        }
        const updatedInfo = await updateStudentInfo(studentId, values);
        return res.status(200).json(updatedInfo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export const createStudentInformation = async (req: express.Request, res: express.Response) => {
    try {
        const values: CreateStudentInfoDto = req.body;
        const createdInfo = await createStudentInfo(values);
        return res.status(200).json(createdInfo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}