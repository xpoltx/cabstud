import mongoose from "mongoose";
import { CreateDisciplineDto } from "../dtos/discipline/CreateDiscipline.dto";
import { UpdateDisciplineDto } from "../dtos/discipline/UpdateDiscipline.dto";
const DisciplineSchema = new mongoose.Schema({
    name: { type: String, required: true},
    course: { type: Number, required: true},
    professorId: {type: String, required: true, select: false},
    faculty: {type: String, required: true},
});

export const DisciplineModel = mongoose.model('Discipline', DisciplineSchema);

export const getDisciplineById = (id: string) => DisciplineModel.findById({_id: id});
export const getProfessorDisciplines = (professorId : string) => DisciplineModel.find({professorId});
export const getFacultyDisciplines = (faculty: string)=> DisciplineModel.find({faculty});

export const createDiscipline = (values: CreateDisciplineDto) => new DisciplineModel(values).save().then((discipline)=> discipline.toObject()).catch(err => console.log(err));
export const deleteDiscipline = (id: string) => DisciplineModel.findByIdAndDelete({_id:id});
export const updateDiscipline = (id: string, values: UpdateDisciplineDto) => DisciplineModel.findByIdAndUpdate({_id:id}, values);