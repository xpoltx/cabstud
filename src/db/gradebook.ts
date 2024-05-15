import mongoose from "mongoose";
import { CreateGradebookDto } from "../dtos/gradebook/CreateGradebook.dto";
import { UpdateGradebookDto } from "../dtos/gradebook/UpdateGradebook.dto";
const GradebookSchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    disciplineId: {type: String, required: true},
    grade: {type: Number, required: false},
    debt: {type:Boolean, default: true, required: false}
});

export const GradebookModel = mongoose.model('Gradebook', GradebookSchema);

export const getGradebook = (id: string) => GradebookModel.findById({_id: id});
export const getStudentGradebook = (studentId: string) => GradebookModel.find({studentId});
export const getDisciplineGradebook = (disciplineId: string) => GradebookModel.find({disciplineId});

export const createGradebook = (values: CreateGradebookDto) => new GradebookModel(values).save().then((gradebook)=>gradebook.toObject()).catch(error=>console.log(error));
export const deleteGradebook = (id: string[]) => GradebookModel.deleteMany({_id: {$in: id}}); 
export const updateGradebook = (id: string, values: UpdateGradebookDto) => GradebookModel.findByIdAndUpdate({_id: id}, values);