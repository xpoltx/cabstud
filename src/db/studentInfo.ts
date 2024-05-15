import mongoose from "mongoose";
import {CreateStudentInfoDto} from "../dtos/studentInfo/CreateStudentInfo.dto";
import { UpdateStudentInfoDto } from "../dtos/studentInfo/UpdateStudentInfo.dto";

const StudentInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  course: { type: Number, required: true },
  group: { type: String, required: true },
  faculty: { type: String, required: true },
  studyForm: { type: String, required: true },
  payment: { type: String, required: true },
});

export const StudentInfoModel = mongoose.model('StudentInfo', StudentInfoSchema);

export const getStudentInfo = (id: string) => StudentInfoModel.findById({ _id: id });
export const getGroupList = (groupName: string) => StudentInfoModel.find({ group: groupName }).select(['userId', 'group']);

export const createStudentInfo = (values: CreateStudentInfoDto) => new StudentInfoModel(values).save().then((studentInfo) => studentInfo.toObject()).catch(err => { console.log(err) });
export const deleteStudentInfo = (userId: string) => StudentInfoModel.findOneAndDelete({userId});
export const updateStudentInfo = (userId: string, values: UpdateStudentInfoDto) => StudentInfoModel.findOneAndUpdate({userId}, values);
