import mongoose from "mongoose";
import { CreateStudyPlanDto } from "../dtos/studyPlan/CreateStudyPlan.dto";
import { UpdateStudyPlanDto } from "../dtos/studyPlan/UpdateStudyPlan.dto";

const StudyPlanSchema = new mongoose.Schema({
    disciplineId: {type: String, required: true},
    course: {type: Number, required: true},
    faculty: {type: String, required: true},
    credits: {type: Number, required: true},
});

export const StudyPlanModel = mongoose.model('StudyPlan', StudyPlanSchema);

export const getStudyPlan = (id: string) => StudyPlanModel.findById({_id: id});
export const getPlanByFacultyAndCourse = (faculty: string, course: number) => StudyPlanModel.find({faculty, course});

export const createStudyPlan = (values: CreateStudyPlanDto) => new StudyPlanModel(values).save().then((plan) => plan.toObject()).catch(err=> console.log(err));
export const deleteStudyPlan = (ids: string[]) => StudyPlanModel.deleteMany({_id: {$in: ids}});
export const updateStudyPlan = (id: string, values: UpdateStudyPlanDto) => StudyPlanModel.findByIdAndUpdate({_id: id},values);